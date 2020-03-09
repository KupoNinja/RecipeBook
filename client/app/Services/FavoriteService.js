import { resource } from "../resource.js";
import store from "../store.js";
import Favorite from "../Models/Favorite.js";

class FavoriteService {
  async getFavorites() {
    let data = await resource.get("api/favorites");
    let favorites = data.map(f => new Favorite(f));
    console.log(favorites);
    store.commit("favorites", favorites);
  }

  async createFavorite(favoriteData) {
    let data = await resource.post("api/favorites", favoriteData);
    let newFavorite = new Favorite(data);
    store.State.favorites.push(newFavorite);
    store.commit("favorites", store.State.favorites);
  }

  async removeFavorite(recipeId) {
    let message = await resource.delete("api/favorites/" + recipeId);
    let i = store.State.favorites.findIndex(f => f.recipeId == recipeId);
    if (i != -1) {
      store.State.favorites.splice(i, 1);
      store.commit("recipes", store.State.recipes);
    }
    return message;
  }
}

export const favoriteService = new FavoriteService();
