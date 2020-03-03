import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import RecipeSchema from "../models/Recipe";
import CommentSchema from "../models/Comment";
import RecipeFavoriteSchema from "../models/RecipeFavorite";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Recipe = mongoose.model("Recipe", RecipeSchema);
  RecipeFavorite = mongoose.model("RecipeFavorite", RecipeFavoriteSchema);
  Comment = mongoose.model("Comment", CommentSchema);
}

export const dbContext = new DbContext();
