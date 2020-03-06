import { dbContext } from "../db/DbContext";
import { BadRequest, NotFound } from "../utils/Errors";

class FavoriteService {
  async getAllByUserId(userId) {
    if (!userId) {
      throw new BadRequest("Invalid User Id.");
    }

    return await dbContext.RecipeFavorite.find({ userId });
  }

  async create(favoriteData) {
    //   if ()
    return await dbContext.RecipeFavorite.create(favoriteData);
  }
}

export const favoriteService = new FavoriteService();
