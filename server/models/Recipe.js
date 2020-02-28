import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const RecipeSchema = new Schema(
  {
    title: { type: String, maxlength: 50, trim: true, required: true },
    ingredients: { type: String, maxlength: 1000, trim: true, required: true },
    directions: { type: String, maxlength: 2000, trim: true, required: true },
    comment: { type: ObjectId, ref: "Comment" },
    createdBy: { type: String, required: true },
    likes: { type: Number },
    isFavorite: { type: Boolean }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Recipe;
