import store from "../store.js";
import { recipeService } from "../Services/RecipeService.js";
import { Auth0Provider } from "../auth/Auth0Provider.js";

function _drawRecipes() {
  let recipes = store.State.recipes;
  let template = "";
  recipes.forEach(r => (template += r.Template));
  document.getElementById("recipes").innerHTML = template;
}

function _drawRecipeForm() {
  let template = /* html */ `
      <form id="recipe-form" onsubmit="app.recipesController.createRecipe()">
        <input name="id" type="text" class="d-none" disabled />
        <div class="form-group">
          <label for="title">Title:</label>
          <input name="title" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="imgUrl">ImgUrl:</label>
          <input name="imgUrl" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="ingredients">Ingredients:</label>
          <input name="ingredients" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="directions">Directions:</label>
          <input name="directions" type="text" class="form-control" />
        </div>
        <button type="submit">Submit</button>
      </form>
    `;
  document.getElementById("form").innerHTML = template;
}

export default class RecipesController {
  constructor() {
    this.getRecipes();
    store.subscribe("recipes", _drawRecipes);
  }

  //   showRecipesForm() {
  //     _drawRecipeForm();
  //   }

  async getRecipes() {
    try {
      await recipeService.getRecipes();
    } catch (error) {
      console.log(error);
    }
  }

  async createRecipe() {
    debugger;
    event.preventDefault();
    let form = event.target;
    try {
      recipeService.createRecipe({
        // @ts-ignore
        title: form.title.value,
        // @ts-ignore
        imgUrl: form.imgUrl.value,
        // @ts-ignore
        ingredients: form.ingredients.value,
        // @ts-ignore
        directions: form.directions.value
      });
      // @ts-ignore
      form.reset();
    } catch (error) {
      console.log(error);
    }
  }
}
