import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import SERVER_URI from '../config';

function PaymentReceipt() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const receiptDetails = {
        orderID: queryParams.get('session_id'),
        date: formattedDate,
        productID: JSON.parse(decodeURIComponent(queryParams.get('order'))),
    };

     
    const token = localStorage.getItem('token');
    const config = {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchProductData() {
        setLoading(true);
        try {
          const productData = await Promise.all(
            receiptDetails.productID.map(async (productId) => {
              const response = await axios.get(`${SERVER_URI}/api/recipe/get/${productId}`,config);
              return response.data.data;
            })
          );
    
          setPosts(productData);
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      }
    
      useEffect(() => {
        fetchProductData();
        localStorage.removeItem("cart");
      }, []);
    
  
    const totalAmount = posts.reduce((total, item) => total + item[0].price, 0);
    
    const printReceipt = () => {
        window.print();
    }

    const sendReceiptByEmail = async() => {

        toast('📲 Sending Mail', {
            position: "top-center",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

        try {
           const response= await axios.post(`${SERVER_URI}/api/payment/receipt-mail`,{
            orderID:receiptDetails.orderID,
            recipeID:receiptDetails.productID,
            totalAmount
           },config)
            if (response.status===200) {
              toast.success("Sent Successfully")
              setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
     
    }

   
    return (
        loading?<Spinner/>:
        <div className="max-w-[50%] mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold">Tastebite Payment Receipt</h1>
            </div>
            <div className="receipt">
                <p className="text-sm break-all text-blue-900 font-semibold mb-8">Order ID: {receiptDetails.orderID}</p>
                <p className="text-sm">Total Amount: {totalAmount}</p>
                <p className="text-sm">Date: {receiptDetails.date}</p>
                <div className="text-sm">
                    <h1 className='text-lg font-bold'>Order Details:</h1>
                    <table className="table-auto border-collapse w-full">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Recipe Name</th>
                                <th className="border px-4 py-2">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((element,index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{element[0].recipe_name}</td>
                                    <td className="border px-4 py-2">{element[0].price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <button onClick={printReceipt} className="hide-on-print bg-blue-500 text-white px-4 py-2 rounded-lg mr-4">Print Receipt</button>
                <button onClick={sendReceiptByEmail} className="hide-on-print bg-blue-500 text-white px-4 py-2 rounded-lg">Send by Email</button>
            </div>
        </div>
    );
}

export default PaymentReceipt;
