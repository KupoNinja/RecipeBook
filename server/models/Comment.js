import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Comment = new Schema(
  {
    recipId: { type: ObjectId, ref: "Recipe", required: true },
    content: { type: String, maxlength: 2000, trim: true, required: true },
    createdBy: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Comment;
