import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { add, remove } from '../../redux/Slices/CartSlice';


const BuyProduct = (props) => {
  const post = props.post;

  const uint8Array = new Uint8Array(post.image.data);
const binaryString = uint8Array.reduce((str, byte) => str + String.fromCharCode(byte), '');
const img = `data:image/jpeg;base64,${btoa(binaryString)}`;

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function addHandler() {
    dispatch(add(post));
    toast.success("Item Added to cart",{ position: toast.POSITION.TOP_CENTER})
  }

  function removeHandler() {
    dispatch(remove(post._id));
    toast.error("item removed",{ position: toast.POSITION.TOP_CENTER})
  }

  return (
    <div className='flex flex-col items-center justify-between
    hover:scale-110 transition duration-300 ease-in-out gap-3 mt-10 ml-5 rounded-xl outline
    shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]'>
      <div>
        <p className='text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1'>{post.recipe_name}</p>
      </div>
      <div>
        <p className='w-40 text-gray-400 text-[10px] text-left'>{post.process.split(" ").slice(0, 10).join(" ") + '...'}</p>
      </div>
      <div className="h-[180px]">
  <img
    src={img}
    className="h-full w-full"
    alt=""
  />
</div>

      <div className='flex justify-between items-center gap-10 w-full mt-5 px-5'>
        <p className='text-green-600 font-semibold'>${post.price}</p>

        <div className='mb-1'>
          {
            cart.some((p) => p._id === post._id) ?
              (<div className='text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
              text-[12px] p-1 px-3 uppercase
              hover:bg-gray-700 transition duration-300 ease-in
              hover:text-white'>
                <button onClick={removeHandler}>
                  Remove Item
                </button>
              </div>) : (
                <div>
                  <button 
                  className="'text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
              text-[12px] p-1 px-3 uppercase
              hover:bg-gray-700 transition duration-300 ease-in
              hover:text-white"
                  onClick={addHandler}>
                    Add to Cart
                  </button>
                </div>
              )
          }
        </div>
      </div>

    </div>
  );
}

export default BuyProduct;
