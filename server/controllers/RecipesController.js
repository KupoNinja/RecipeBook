import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0Provider";
import { recipeService } from "../services/RecipeService";

export class RecipesController extends BaseController {
  constructor() {
    super("api/recipes");
    this.router = express
      .Router()
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.isAuthorized)
      .post("", this.create);
  }
  async getAll(req, res, next) {
    try {
      let recipes = await recipeService.getAll(req.query);
      return res.send(recipes);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.user.sub;
      let recipe = await recipeService.create(req.body);
      return res.send(recipe);
    } catch (error) {
      next(error);
    }
  }
}
