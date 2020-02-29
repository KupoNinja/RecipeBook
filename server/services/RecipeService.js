import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class RecipeService {
  async getAll(query = {}) {
    let recipes = await dbContext.Recipe.find({ ...query, deleted: false });
    return recipes;
  }

  async create(recipeData) {
    let recipe = await dbContext.Recipe.create(recipeData);
    return recipe;
  }

  //   async findById(id) {
  //     let value = await dbContext.Values.findById(id);
  //     if (!value) {
  //       throw new BadRequest("Invalid Id");
  //     }
  //     return value;
  //   }
}

export const recipeService = new RecipeService();
