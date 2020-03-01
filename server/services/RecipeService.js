import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class RecipeService {
  // NOTE Not gettiing all recipes...
  async getAll(query = {}) {
    return await dbContext.Recipe.find({ ...query, isDeleted: false });
  }

  async getById(id) {
    let recipe = await dbContext.Recipe.findById(id);
    if (!recipe) {
      throw new BadRequest("Invalid Id");
    }
    // @ts-ignore
    if (recipe.isDeleted) {
      throw new BadRequest("This recipe has been deleted.");
    }

    return recipe;
  }

  async create(recipeData) {
    return await dbContext.Recipe.create(recipeData);
  }

  async update(recipeId, recipeData) {
    let recipeToUpdate = await this.getById(recipeId);
    // @ts-ignore
    recipeData.creatorId = recipeToUpdate.creatorId;
    // NOTE Does $isDeleted work?
    // @ts-ignore
    if (recipeToUpdate.isDeleted) {
      throw new BadRequest("Cannot edit this recipe. It has been deleted.");
    }

    return await dbContext.Recipe.findByIdAndUpdate(recipeId, recipeData, {
      new: true
    });
  }

  async delete(recipeId) {
    let recipeToDelete = await dbContext.Recipe.findById(recipeId);
    // @ts-ignore
    recipeToDelete.isDeleted = true;
    await recipeToDelete.save();
  }
}

export const recipeService = new RecipeService();
