import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0Provider";
import { recipeService } from "../services/RecipeService";
import { favoriteService } from "../services/FavoriteService";

export class FavoritesController extends BaseController {
  constructor() {
    super("api/favorites");
    this.router = express
      .Router()
      .use(auth0Provider.isAuthorized)
      .get("", this.getFavoritesByUserId)
      .post("", this.create)
      .delete("/:id", this.delete);
    // TODO Need to make Roles in Auth0 so only the user who created can edit or delete.
  }

  async getFavoritesByUserId(req, res, next) {
    try {
      let favorites = await favoriteService.getFavoritesByUserId(req.user.sub);
      res.send(favorites);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      req.body.userId = req.user.sub;
      res.send(await favoriteService.create(req.body));
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await favoriteService.delete(req.params.id);
      res.send("Favorite removed!");
    } catch (error) {
      next(error);
    }
  }
}
