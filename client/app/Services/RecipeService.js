import store from "../store.js";
import Recipe from "../Models/Recipe.js";
import { resource } from "../resource.js";

class RecipeService {
  async getRecipes() {
    let data = await resource.get("api/recipes");
    let recipes = data.map(r => new Recipe(r));
    store.commit("recipes", recipes);
  }

  async createRecipe() {
    resource.post("api/recipes");
  }
}

export const recipeService = new RecipeService();
