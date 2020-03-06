import { resource } from "../resource.js";
import store from "../store.js";
import Favorite from "../Models/Favorite.js";

class FavoriteService {
  async getFavorites() {
    let data = await resource.get("api/favorites");
    let favorites = data.map(f => new Favorite(f));
    store.commit("favorites", favorites);
  }

  async createFavorite(favoriteData) {
    let data = await resource.post("api/favorites", favoriteData);
    let newFavorite = new Favorite(data);
    store.State.favorites.push(newFavorite);
    store.commit("favorites", store.State.favorites);
  }
}

export const favoriteService = new FavoriteService();
