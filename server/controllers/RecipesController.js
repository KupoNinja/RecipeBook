import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0Provider";
import { recipeService } from "../services/RecipeService";
import { commentService } from "../services/CommentService";

export class RecipesController extends BaseController {
  constructor() {
    super("api/recipes");
    this.router = express
      .Router()
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/comments", this.getCommentsByRecipeId)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      // TODO Need to make Roles in Auth0 so only the user who created can edit or delete.
      .put("/:id", this.update)
      .delete("/:id", this.delete);
  }

  async getAll(req, res, next) {
    try {
      let recipes = await recipeService.getAll(req.query);
      return res.send(recipes);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      let recipe = await recipeService.getById(req.params.id);
      return res.send(recipe);
    } catch (error) {
      next(error);
    }
  }

  async getCommentsByRecipeId(req, res, next) {
    try {
      let comments = await commentService.getAllByRecipeId(req.params.id);
      return res.send(comments);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.user.sub;
      req.body.creatorName = req.userInfo.name;
      req.body.creatorImg = req.userInfo.picture;
      let recipe = await recipeService.create(req.body);
      return res.send(recipe);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      let updatedRecipe = await recipeService.update(req.params.id, req.body);
      return res.send(updatedRecipe);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await recipeService.delete(req.params.id);
      return res.send("Recipe deleted!");
    } catch (error) {
      next(error);
    }
  }
}
