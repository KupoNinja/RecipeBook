import { dbContext } from "../db/DbContext.js";
import { BadRequest, NotFound } from "../utils/Errors.js";

class FavoriteService {
  async getFavoritesByUserId(userId) {
    if (!userId) {
      throw new BadRequest("Invalid User Id.");
    }

    return await dbContext.RecipeFavorite.find({ userId });
  }

  async create(favoriteData) {
    if (!favoriteData) {
      throw new BadRequest("Unable to favorite.");
    }

    return await dbContext.RecipeFavorite.create(favoriteData);
  }

  async delete(favoriteId) {
    return await dbContext.RecipeFavorite.findByIdAndDelete(favoriteId);
  }
}

export const favoriteService = new FavoriteService();
