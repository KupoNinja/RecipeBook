import store from "../store.js";
import { recipeService } from "../Services/RecipeService.js";
import { Auth0Provider } from "../auth/Auth0Provider.js";

function _drawRecipes() {
  let recipes = store.State.recipes;
  let template = "";
  recipes.forEach(r => (template += r.Template));
  document.getElementById("recipes").innerHTML = template;
  console.log(recipes);
}

export default class RecipesController {
  constructor() {
    this.getRecipes();
    store.subscribe("recipes", _drawRecipes);
  }

  async getRecipes() {
    try {
      await recipeService.getRecipes();
    } catch (error) {
      console.log(error);
    }
  }
}
