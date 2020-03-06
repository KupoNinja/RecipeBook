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
      .get("", this.getFavorites)
      .post("", this.create);
    // TODO Need to make Roles in Auth0 so only the user who created can edit or delete.
  }

  async getFavorites(req, res, next) {
    try {
      // TODO Get userid...
      let favorites = await favoriteService.getAllByUserId(req.user.sub);
      res.send(favorites);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.user.sub;
      return res.send(await favoriteService.create(req.body));
    } catch (error) {
      next(error);
    }
  }
}
