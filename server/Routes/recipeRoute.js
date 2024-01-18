import express from "express";
import addRecipe from "../Controllers/addRecipe.js"
import  {getRecipe,getRecipeById} from "../Controllers/getRecipe.js"
import deleteRecipe from "../Controllers/deleteRecipe.js"
import updateRecipe from "../Controllers/updateRecipe.js"
import {upload,uploadCompressedImage,updateCompressedImage} from "../Middleware/compressedImage.js";

const recipeRouter=express.Router();

recipeRouter.post("/add",upload,uploadCompressedImage,addRecipe);
recipeRouter.get("/get",getRecipe);
recipeRouter.get("/get/:id",getRecipeById)
recipeRouter.patch("/update/:id",upload,updateCompressedImage,updateRecipe);
recipeRouter.delete("/delete/:id",deleteRecipe);

export default recipeRouter;
