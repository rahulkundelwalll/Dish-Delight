import dotenv from 'dotenv'
import Stripe from 'stripe';
import mailSender from '../utils/mailSender.js';
import receiptSendTemplate from '../mail/templates/receiptSendTemplate.js';
import Users from '../Models/userSchema.js';
import pdfMaker from '../utils/pdfMaker.js';
import makeReceipt from '../utils/makeReceipt.js';
import CLIENT_URI from '../config.js';


dotenv.config();
const stripe = new Stripe(process.env.STRIPE_PRIVATE);

const stripePay = async (req, res) => {

    const { products } = req.body;

    const pId = products.map((product) => {
        return product._id
    })

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.recipe_name
            },
            unit_amount: product.price * 100,
        },
        quantity: 1,
    }))

    const session = await stripe.checkout.sessions.create(
        {
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${CLIENT_URI}/success?session_id={CHECKOUT_SESSION_ID}&order=${encodeURIComponent(JSON.stringify(pId))}`,
            cancel_url: `${CLIENT_URI}/cancel`,
        });
    res.json({ id: session.id });
}

const receiptByMail = async (req, res) => {
    try {
        const {orderID,recipeID,totalAmount}=req.body
        const user=await Users.findById({_id:req.user.id})
        console.log(recipeID);
        console.log(totalAmount);

        const receiptHTML=await makeReceipt(orderID,recipeID,totalAmount);
        const receiptPDF=await pdfMaker(receiptHTML);
        await mailSender
            (
                user.email,
                `TasteBite Purchase Receipt`,
                receiptSendTemplate(user.name),
                receiptPDF  
            );

        return res.status(200)
            .json({
                success: true,
                message: "Mail sent successfully"
            })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Mail Failed ${error}`
        })
    }

}

export { stripePay, receiptByMail }