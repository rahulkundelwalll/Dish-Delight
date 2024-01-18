import mongoose from "mongoose"

const recipeSchema=new mongoose.Schema({
    recipe_name:{
        type:String,
        required:true
    },
    image:{
        type:Buffer,
        required:true
    },
    ingredients:{
        type:Array,
        required:true
    },
    process:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    time:{
        type:Number,
        required:true,
    },
    uploadedAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }

})

const Recipe=mongoose.model("recipeList",recipeSchema);
export default Recipe;