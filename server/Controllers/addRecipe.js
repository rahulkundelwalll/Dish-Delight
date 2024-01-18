import Recipe from "../Models/recipeSchema.js";
import {uploadCompressedImage} from "../Middleware/compressedImage.js";

async function addRecipe(req, res) {
    try {
        const {recipe_name, ingredients, process, price, time } = req.body;
        const image = req.compressedImageBuffer;
        const recipe = await Recipe.create({
            recipe_name,
            image,
            ingredients,
            process,
            price,
            time
        });

        return res.status(200).json({
            success: true,
            message: "recipe added successfully "
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "recipe adding failed try again",
        });
    }
}

export default addRecipe;