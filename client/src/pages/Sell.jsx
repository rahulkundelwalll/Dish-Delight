import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import SERVER_URI from "../config";

function Sell() {
  const{loggedIn}=useContext(AuthContext)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    recipe_name: "",
    image: null,
    ingredients: "",
    process: "",
    price: 0,
    time: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      image: imageFile,
    });
  };

  const handleSubmit = async (e) => {
    if (!loggedIn) {
      navigate("/login");
      toast.warn("Login to Sell Recipe");
      return;
    }
  e.preventDefault();
  const ingredientsArray = formData.ingredients.split("\n").map((ingredient) => ingredient.trim());

  const formDataToSend = new FormData();
  formDataToSend.append("recipe_name", formData.recipe_name);
  formDataToSend.append("image", formData.image);

  ingredientsArray.forEach((ingredient, index) => {
    formDataToSend.append(`ingredients[${index}]`, ingredient);
  });

  formDataToSend.append("process", formData.process);
  formDataToSend.append("price", formData.price);
  formDataToSend.append("time", formData.time);
 
  const token = localStorage.getItem('token');
  const config = {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(`${SERVER_URI}/api/recipe/add`, formDataToSend,config);
    if (response.status === 200) {
      navigate("/");
      toast.success("Recipe Added SuccessFully");
    }
    
  } catch (error) {
    toast.error("Fill all details carefully",{ position: toast.POSITION.TOP_CENTER});
    console.error("Error uploading data:", error);
  }
};

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Upload Recipe Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="recipe_name" className="block text-gray-600">Recipe Name</label>
          <input
            type="text"
            id="recipe_name"
            name="recipe_name"
            value={formData.recipe_name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-600">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-gray-600">Ingredients (one per line)</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="process" className="block text-gray-600">Process</label>
          <textarea
            id="process"
            name="process"
            value={formData.process}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-600">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-600">Time (minutes)</label>
          <input
            type="number"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

export default Sell;
