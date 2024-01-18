import Recipe from "../Models/recipeSchema.js";

async function getRecipe(req, res) {
    try {
        const allRecipe = await Recipe.find({});

        res.status(200)
            .json({
                success: true,
                data: allRecipe,
                message: "Recipe fetch successfully"
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch recipe"
        })

    }
}


async function getRecipeById(req,res){
    try {
        const id=req.params.id;
        const recipe=await Recipe.find({_id:id})

        if (!recipe) {
            res.status(400).json({
             success:false,
             message:` Recipe not found with ${id}`
            });
        }

        res.status(200).json({
            success:true,
            data:recipe,
            message:`Recipe Found`
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch recipe"
        })
    }
}

export { getRecipe,getRecipeById};