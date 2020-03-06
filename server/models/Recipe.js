import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Recipe = new Schema(
  {
    title: { type: String, maxlength: 50, trim: true, required: true },
    ingredients: [{ type: String, maxlength: 50, trim: true, required: true }],
    directions: { type: String, maxlength: 2000, trim: true, required: true },
    imgUrl: { type: String },
    creatorId: { type: String, required: true },
    // NOTE Putting creatorImg and creatorName breaks if the user ever changes...
    creatorImg: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    creatorName: { type: String, default: "Fresh Betty" },
    likes: { type: Number, default: 0 },
    isDeleted: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Recipe;
