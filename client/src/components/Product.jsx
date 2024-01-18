
import { useNavigate } from 'react-router-dom';

const Product = (props) => {
  const post = props.recipe;
  const navigate=useNavigate();

  const detailsHandler = (postID) => {
    const uriParts = postID.split('#');
    if (uriParts.length > 1) {
      const id = uriParts[1]; 
      navigate(`/product/details/${id}`);
    } 
  };
  
  const sourceHandler=()=>{
  window.open(post.url);
  };
  

  return (
    <div className='flex flex-col items-center justify-between
    hover:scale-110 transition duration-300 ease-in-out gap-3 mt-10 ml-5 rounded-xl outline
    shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]'>
      <div>
        <p className='text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1'>{post.label}</p>
      </div>
      <div className='h-[180px]'>
        <img src={post.image} className="h-full w-full" alt="" />
      </div>
      <div className='flex justify-between items-center gap-10 w-full mt-5 px-5'>
        <div className='mb-1 flex gap-10'>
            <div className='text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
              text-[12px] p-1 px-3 uppercase
              hover:bg-gray-700 transition duration-300 ease-in
              hover:text-white'>
                <button onClick={()=>detailsHandler(post.uri)}>
                  Details
                </button>
              </div>
          <div className='text-white border-2 bg-black border-blue-900 rounded-full font-semibold 
              text-[12px] p-1 px-3 uppercase
              hover:bg-white transition duration-300 ease-in
              hover:text-black'>
          <button onClick={sourceHandler}>
                  Source
                </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Product;
