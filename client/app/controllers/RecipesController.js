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

  showRecipesForm() {
    _drawRecipeForm();
  }

  async getRecipes() {
    try {
      await recipeService.getRecipes();
    } catch (error) {
      console.log(error);
    }
  }

  async createRecipe() {
    event.preventDefault();
    let form = event.target;
    try {
      let recipeData = {
        // @ts-ignore
        title: form.title.value,
        // @ts-ignore
        imgUrl: form.imgUrl.value,
        // @ts-ignore
        ingredients: form.ingredients.value,
        // @ts-ignore
        directions: form.directions.value
      };

      // @ts-ignore
      let recipeId = form.id.value;
      if (recipeId) {
        recipeData.id = recipeId;
        await recipeService.updateRecipe(recipeData);
        console.log(store.State.recipes);
      } else {
        await recipeService.createRecipe(recipeData);
      }
      // @ts-ignore
      form.reset();
    } catch (error) {
      console.log(error);
    }
  }

  async editRecipe(recipeId) {
    _drawRecipeForm();
    let recipe = store.State.recipes.find(r => r.id == recipeId);
    let form = document.getElementById("recipe-form");
    // @ts-ignore
    form.id.value = recipe.id;
    // @ts-ignore
    form.title.value = recipe.title;
    // @ts-ignore
    form.imgUrl.value = recipe.imgUrl;
    // @ts-ignore
    form.ingredients.value = recipe.ingredients;
    // @ts-ignore
    form.directions.value = recipe.directions;
  }

  // async updateRecipe() {
  //   try {
  //     await recipeService.updateCar();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async addALike(recipeId) {
    try {
      await recipeService.addALike(recipeId);
    } catch (error) {
      console.log(error);
    }
  }
}
