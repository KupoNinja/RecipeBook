import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const RecipeFavorite = new Schema({
  recipeId: { type: ObjectId, ref: "Recipe", required: true },
  userId: { type: String, required: true }
});

export default RecipeFavorite;
