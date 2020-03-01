import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class RecipeService {
  async getAll(query = {}) {
    return await dbContext.Recipe.find({ ...query, deleted: false });
  }

  async getById(id) {
    let recipe = await dbContext.Recipe.findById(id);
    if (!recipe) {
      throw new BadRequest("Invalid Id");
    }
    return recipe;
  }

  async create(recipeData) {
    return await dbContext.Recipe.create(recipeData);
  }

  async update(recipeId, recipeData) {
    let recipeToUpdate = await this.getById(recipeId);
    // @ts-ignore
    recipeData.createdBy = recipeToUpdate.createdBy;
    // NOTE Does $isDeleted work?
    // @ts-ignore
    if (recipeToUpdate.isDeleted) {
      throw new BadRequest("Cannot edit this recipe. It has been deleted.");
    }

    return await dbContext.Recipe.findByIdAndUpdate(recipeId, recipeData, {
      new: true
    });
  }
}

export const recipeService = new RecipeService();
