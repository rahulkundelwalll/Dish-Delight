import React from 'react'
import {AiFillDelete} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { remove } from '../../redux/Slices/CartSlice';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const CartItem = ({item}) => {
  const uint8Array = new Uint8Array(item.image.data);
  const binaryString = uint8Array.reduce((str, byte) => str + String.fromCharCode(byte), '');
  const img = `data:image/jpeg;base64,${btoa(binaryString)}`;
  const dispatch=useDispatch();
  const removeFromCart=()=>{
dispatch(remove(item._id))
toast.success("item removed from cart")
  }
  return (
    <div className="w-[100%] md:w-[60%] flex flex-col p-2">
      <div className="flex items-center p-2 md:p-5 justify-between border-b-2 border-slate-500  mt-2 mb-2 md:mx-5 ">
        <div className='w-[30%]'> <img src={img} alt="" /></div>
        <div
        className="md:ml-10 self-start space-y-5 w-[100%] md:w-[70%]">
         <div className="text-xl text-slate-700 font-semibold"> {item.recipe_name}</div>
         <div className="text-base text-slate-700 font-medium"> {item.process.split(" ").slice(0, 10).join(" ") + '...'}</div>
         <div className='flex items-center justify-between'>
         <div  className='font-bold text-lg text-green-600'> {item.price}</div>

         <div className=' bg-red-200 group hover:bg-red-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3' onClick={removeFromCart}>
         <AiFillDelete/></div>

         </div>
         </div>
      </div>
    </div>
  )
}

export default CartItem
