import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import BuyProduct from "../components/SecretRecipe/BuyProduct";
import axios from "axios";
import SERVER_URI from "../config";

const Buy = () => {
  const API_URL = `${SERVER_URI}/api/recipe/get`;
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  async function fetchProductData() {
    setLoading(true);
    try {
   await axios.get(API_URL,{withCredentials:true})
   .then((res)=> setPosts(res.data))
   .catch((error)=>console.error(error))
    } 
    catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchProductData();
  }
  , [])
  return (
    <div>
      {
        loading ? <Spinner /> :
          posts.data ?
            (
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
                {
                  posts.data.map((post) => (
                    <BuyProduct key={post._id} post={post} />
                  ))
                }

              </div>
            ) :
            <div>
              <p>Product not Found</p>
            </div>
      }
    </div>

  );
};

export default Buy;
