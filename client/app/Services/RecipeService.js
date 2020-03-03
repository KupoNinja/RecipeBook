import store from "../store.js";
import Recipe from "../Models/Recipe.js";
import { resource } from "../resource.js";

class RecipeService {
  async getRecipes() {
    let data = await resource.get("api/recipes");
    let recipes = data.map(r => new Recipe(r));
    store.commit("recipes", recipes);
  }

  async createRecipe(recipeData) {
    let data = await resource.post("api/recipes", recipeData);
    let newRecipe = new Recipe(data);
    store.State.recipes.push(newRecipe);
    store.commit("recipes", store.State.recipes);
  }
}

export const recipeService = new RecipeService();
