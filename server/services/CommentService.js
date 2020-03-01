import { dbContext } from "../db/DbContext";
import { BadRequest, NotFound } from "../utils/Errors";

class CommentService {
  // NOTE Not gettiing all recipes...
  async getAllByRecipeId(recipeId) {
    if (!recipeId) {
      throw new BadRequest("Invalid Recipe Id.");
    }
    return await dbContext.Comment.find({ recipeId });
  }

  async create(commentData) {
    return await dbContext.Comment.create(commentData);
  }
}

export const commentService = new CommentService();
