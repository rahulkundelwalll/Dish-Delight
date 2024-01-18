import nodemailer from "nodemailer"
import dotenv from 'dotenv';
dotenv.config();

const mailSender = async (email, title, body,attachment) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })


        let info = await transporter.sendMail({
            from: `"DishDelight" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
            attachments: [
                {
                    filename: "DishDelight.pdf", 
                    content: attachment,
                    contentType: "application/pdf", 
                },
             
            ],

        })
        console.log(info);
        return info;
    }
    catch (error) {
        console.log(error.message);
        return error;
    }
}


export default mailSender;