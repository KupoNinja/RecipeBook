import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Comment = new Schema(
  {
    recipeId: { type: ObjectId, ref: "Recipe", required: true },
    content: { type: String, maxlength: 2000, trim: true, required: true },
    creatorId: { type: String, required: true },
    creatorImg: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    creatorName: { type: String, default: "Fresh Betty" }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Comment;
