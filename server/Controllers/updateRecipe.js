import Recipe from "../Models/recipeSchema.js";
import { updateCompressedImage } from "../Middleware/compressedImage.js";

async function updateRecipe(req, res) {
    try {
        const { id } = req.params;
        const { recipe_name, ingredients, process, price, time } = req.body;
        const image = req.compressedImageBuffer; 

        const updateObj = {
            updatedAt: Date.now(),
        };

        if (recipe_name) {
            updateObj.recipe_name = recipe_name;
        }
        if (ingredients) {
            updateObj.ingredients = ingredients;
        }
        if (process) {
            updateObj.process = process;
        }
        if (price) {
            updateObj.price = price;
        }
        if (time) {
            updateObj.time = time;
        }
        if (image) {
            updateObj.image = image;
        }


        const updatedRecipe = await Recipe.findByIdAndUpdate(
            { _id: id },
            { $set: updateObj },
            { new: true } 
        );

        if (!updatedRecipe) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Recipe updated successfully",
            updatedRecipe,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update recipe",
        });
    }
}

export default updateRecipe;
