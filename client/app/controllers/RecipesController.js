import store from "../store.js";
import { recipeService } from "../Services/RecipeService.js";
import { Auth0Provider } from "../auth/Auth0Provider.js";

function _drawRecipes() {
  let recipes = store.State.recipes;
  let template = "";
  recipes.forEach(r => (template += r.Template));
  document.getElementById("recipes").innerHTML = template;
}

// function _drawCreaterInfo() {
//   let user = Auth0Provider.user;

//   let template = /* html */ `
//     <div>
//       <p>Created By:</p>
//       <img class="rounded-circle" src="${user.picture}" alt="${user.name}" height="45"/>
//       <span class="ml-2">${user.name}</span>
//     </div>
//   `;
//   document.getElementById("created-by").innerHTML = template;
// }

function _drawViewMyRecipes() {
  let user = Auth0Provider.user;
  let myRecipes = store.State.recipes.filter(r => r.creatorId == user.sub);
  let template = "";
  myRecipes.forEach(r => (template += r.Template));
  document.getElementById("recipes").innerHTML = template;
}

function _drawRecipesForm() {
  let template = /* html */ `
      <form id="recipe-form" onsubmit="app.recipesController.createRecipe()">
        <input name="id" type="text" class="d-none" disabled />
        <div class="form-group">
          <label for="title">Title:</label>
          <input id="recipe-start" name="title" type="text" class="form-control" />
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
          <textarea name="directions" class="form-control"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    `;
  document.getElementById("recipes-form").innerHTML = template;
  document.getElementById("recipe-start").focus();
}

// function avatarTemplate(user) {
//   return user.sub
//     ? /*html*/ `
//     <div>
//       <img class="rounded-circle" src="${user.picture}" alt="${user.name}" height="45"/>
//       <span class="ml-2">${user.name}</span>
//     </div>`
//     : /*html*/ `
//     <div></div>
//     `;
// }

export default class RecipesController {
  constructor() {
    this.getRecipes();
    store.subscribe("recipes", _drawRecipes);
  }

  viewMyRecipes() {
    _drawViewMyRecipes();
  }

  showRecipesForm() {
    _drawRecipesForm();
  }

  setActiveRecipe(recipeId) {
    try {
      recipeService.setActiveRecipe(recipeId);
      console.log(store.State.activeRecipe);
    } catch (error) {
      console.log(error);
    }
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
    _drawRecipesForm();
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

  async deleteRecipe(recipeId) {
    try {
      let success = await recipeService.deleteRecipe(recipeId);
      // NOTE success is undefined...
      console.log(success);
    } catch (error) {
      console.log(error);
    }
  }

  // async updateRecipe() {
  //   try {
  //     await recipeService.updateCar();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // NOTE Is there a better way of doing this?
  //      Also, the whole recipe list draws. Utilize ActiveRecipe. Only allow likes/favorites with activeRecipe
  async addALike(recipeId) {
    try {
      await recipeService.addALike(recipeId);
    } catch (error) {
      console.log(error);
    }
  }
}
