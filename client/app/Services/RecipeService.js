import store from "../store.js";
import Recipe from "../Models/Recipe.js";
import { resource } from "../resource.js";

class RecipeService {
  setActiveRecipe(recipeId) {
    debugger;
    let activeRecipe = store.State.Recipe.find(r => r.id == recipeId);
    store.commit("activeRecipe", activeRecipe);
  }
  async getRecipes() {
    let data = await resource.get("api/recipes");
    let recipes = data.map(r => new Recipe(r));
    store.commit("recipes", recipes);
  }

  async createRecipe(recipeData) {
    let ingredients = this.parseIngredients(recipeData.ingredients);
    recipeData.ingredients = ingredients;
    let data = await resource.post("api/recipes", recipeData);
    let newRecipe = new Recipe(data);
    store.State.recipes.push(newRecipe);
    store.commit("recipes", store.State.recipes);
  }

  // NOTE Repeating code...
  async updateRecipe(recipeData) {
    let ingredients = this.parseIngredients(recipeData.ingredients);
    recipeData.ingredients = ingredients;
    let data = await resource.put("api/recipes/" + recipeData.id, recipeData);
    let updatedRecipe = new Recipe(data);
    let i = store.State.recipes.findIndex(r => r.id == updatedRecipe.id);
    if (i != -1) {
      store.State.recipes.splice(i, 1, updatedRecipe);
      store.commit("recipes", store.State.recipes);
    }
  }

  async deleteRecipe(recipeId) {
    let message = await resource.delete("api/recipes/" + recipeId);
    let i = store.State.recipes.findIndex(r => r.id == recipeId);
    if (i != -1) {
      store.State.recipes.splice(i, 1);
      store.commit("recipes", store.State.recipes);
    }
    return message;
  }

  async addALike(recipeId) {
    let recipe = store.State.recipes.find(r => r.id == recipeId);
    recipe.likes++;
    await this.updateRecipe(recipe);
  }

  parseIngredients(ingredients) {
    if (Array.isArray(ingredients)) {
      return ingredients;
    }

    let ingredientArray = ingredients.split(",");
    return ingredientArray;
  }
}

export const recipeService = new RecipeService();
