import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from './Spinner';

const ProductDetails = () => {
  const [currentRecipe, setCurrentRecipe] = useState(null);
  let { id } = useParams();
  id = id.split('_')[1];

  const APP = process.env.REACT_APP_ID;
  const APID = process.env.REACT_APP_API;   

  const API = `https://api.edamam.com/api/recipes/v2/${id}?type=public&q=garlic&app_id=${APP}&app_key=${APID}`;

  async function dataFetch() {
    try {
      const response = await fetch(API);
      const jsonData = await response.json();
      setCurrentRecipe(jsonData.recipe);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    const container = document.getElementById('ing');
    if (container) {
      const ulElement = document.createElement('ul');

      currentRecipe.ingredientLines.forEach((ingredient) => {
        const liElement = document.createElement('li');
        liElement.textContent = ingredient;
        ulElement.appendChild(liElement);
      });

      container.appendChild(ulElement);
    }

  }, [currentRecipe]);
  
  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <div className='bg-gray-100'>
      {currentRecipe ? (
        <div className=" flex items-center justify-betweem flex-col box-border">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold m-2"> {currentRecipe.label}</h2>
          <div className=" mt-2 box-border bg-white items-center justify-evenly rounded-lg shadow-lg w-full h-3/4 flex md:flex-row flex-col gap-10">


            <div className="w-2/5 m-2 flex flex-col">
              <img src={currentRecipe.images.REGULAR.url} alt="Recipe" className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full float-left mr-4 mb-4" />
              <p className="mb-2"><strong>Calories per serving:</strong>{currentRecipe.calories.toString().slice(0,6)}</p>
              <p className="mb-2"><strong>Health Labels:</strong>{currentRecipe.healthLabels.join(',')}</p>
              <p className="mb-2"><strong>Total Time:</strong>{currentRecipe.totalTime} min</p>
            </div>

            <div className="w-2/5 ">
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">Ingredients:</h3>
              <div className="flex flex-wrap items-center justify-between" id='ing'> </div>
            </div>



          </div>
          <div className='py-20'>
            <Link to={currentRecipe.shareAs} className="text-blue-500 text-2xl hover:underline">Click here for more details</Link>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ProductDetails;
