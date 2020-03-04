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

  async updateRecipe(recipeData) {
    let data = await resource.put("api/recipes/" + recipeData.id, recipeData);
    let updatedRecipe = new Recipe(data);
    let i = store.State.recipes.findIndex(r => r.id == updatedRecipe.id);
    if (i != -1) {
      store.State.recipes.splice(i, 1, updatedRecipe);
      store.commit("recipes", store.State.recipes);
    }
  }

  async addALike(recipeId) {
    let recipe = store.State.recipes.find(r => r.id == recipeId);
    recipe.likes++;
    await this.updateRecipe(recipe);
  }
}

export const recipeService = new RecipeService();
