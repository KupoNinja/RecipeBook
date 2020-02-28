import { Schema } from "mongoose";

const Recipe = new Schema(
  {
    title: { type: String, maxlength: 50, trim: true, required: true },
    ingredients: { type: String, maxlength: 1000, trim: true, required: true },
    directions: { type: String, maxlength: 2000, trim: true, required: true },
    createdBy: { type: String, required: true },
    likes: { type: Number },
    isFavorite: { type: Boolean }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Recipe;
