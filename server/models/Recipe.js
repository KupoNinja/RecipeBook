import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Recipe = new Schema(
  {
    title: { type: String, maxlength: 50, trim: true, required: true },
    ingredients: { type: String, maxlength: 1000, trim: true, required: true },
    directions: { type: String, maxlength: 2000, trim: true, required: true },
    imgUrl: { type: String },
    creatorId: { type: String, required: true },
    likes: { type: Number, default: 0 },
    isDeleted: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Recipe;
