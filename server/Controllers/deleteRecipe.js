import Recipe from "../Models/recipeSchema.js";

async function deleteRecipe(req,res){
    try {
        const {id}=req.params;

        await Recipe.findByIdAndDelete({ _id:id});

        res.json({
            success:true,
            message:"recipe deleted successfully"
        });
        
    } catch (error) {
        
        res.status(500).json({
            success:false,
            message:"can't delete recipe"
        });
    }
}

export default deleteRecipe;