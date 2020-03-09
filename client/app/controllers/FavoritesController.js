import { Auth0Provider } from "../auth/Auth0Provider.js";
import { favoriteService } from "../Services/FavoriteService.js";
import store from "../store.js";

// NOTE Same issue as before... targeting multiple id's
function drawFavoritesButton() {
  let user = Auth0Provider.user;
  let button = favoriteButton(user);
  let template = /* html */ `
    ${button}
    `;
  document.getElementById("favorite").innerHTML = template;
}

function drawMyFavorites() {
  let user = Auth0Provider.user;
  // NOTE store should only have user's Favorites already
  let myFavorites = store.State.favorites.filter(f => f.userId == user.sub);
  let myFavoriteRecipes = store.State.recipes.filter(
    r => myFavorites[r.recipeId]
  );
  let template = "";
  myFavoriteRecipes.foreach(r => (template += r.template));
  document.getElementById("recipes").innerHTML = template;
}

// NOTE Sort of working but need recipeId...
function favoriteButton(user) {
  debugger;
  return user.sub
    ? /*html*/ `
    <button type="button" class="btn btn-danger" onclick="app.favoritesController.removeAFavorite()">
        <i class="fas fa-star"></i>
    </button>
  `
    : /*html*/ `
    <button type="button" class="btn btn-primary" onclick="app.favoritesController.addAFavorite()">
        <i class="fas fa-star"></i>
    </button>
  `;
}

// NOTE Get RecipeFavorite object from server.
//      Get Recipes from the store
//      Pass req.user.sub into the service. Use filter
//      Auth0Provider.onAuth(this.getFavorites)

export default class FavoritesController {
  constructor() {
    // Auth0Provider.onAuth(this.getFavorites);
    this.getFavorites();
    Auth0Provider.onAuth(drawFavoritesButton);
    // Auth0Provider.onAuth(this.viewMyFavorites);
  }

  viewMyFavorites() {
    drawMyFavorites();
  }

  async getFavorites() {
    try {
      await favoriteService.getFavorites();
    } catch (error) {
      console.log(error);
    }
  }

  async addAFavorite(recipeId) {
    try {
      await favoriteService.createFavorite(recipeId);
    } catch (error) {
      console.log(error);
    }
  }

  async removeAFavorite(recipeId) {
    try {
      let success = await favoriteService.removeFavorite(recipeId);
      console.log(success);
    } catch (error) {
      console.log(error);
    }
  }
}
