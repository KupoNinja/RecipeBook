import { Auth0Provider } from "../auth/Auth0Provider";
import { favoriteService } from "../Services/FavoriteService";

function _drawFavoritesButton() {
  let template = /* html */ `
    <button type="button" class="btn btn-primary" onclick="app.favoritesController.addAFavorite('${this.id}')">
        <i class="fas fa-star"></i>
    </button>
    `;
  document.getElementById("favorites").innerHTML = template;
}

// NOTE Get RecipeFavorite object from server.
//      Get Recipes from the store
//      Pass req.user.sub into the service. Use filter
//      Auth0Provider.onAuth(this.getFavorites)

export default class FavoritesController {
  constructor() {
    Auth0Provider.onAuth(this.getFavorites);
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
}
