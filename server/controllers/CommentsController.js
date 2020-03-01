import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0Provider";
import { recipeService } from "../services/RecipeService";
import { commentService } from "../services/CommentService";

export class CommentsController extends BaseController {
  constructor() {
    super("api/comments");
    this.router = express
      .Router()
      .use(auth0Provider.isAuthorized)
      .post("", this.create);
    //   .get("", this.getAll)
    //   .get("/:id", this.getById)
    //   .get("/:id/comments", this.getCommentsByRecipeId)
    //   // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
    //   .post("", this.create)
    //   .put("/:id", this.update)
    //   .delete("/:id", this.delete);
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.user.sub;
      return res.send(await commentService.create(req.body));
    } catch (error) {
      next(error);
    }
  }

  //   async getAll(req, res, next) {
  //     try {
  //       let recipes = await recipeService.getAll(req.query);
  //       return res.send(recipes);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //   async getById(req, res, next) {
  //     try {
  //       let recipe = await recipeService.getById(req.params.id);
  //       return res.send(recipe);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //   getCommentsByRecipeId(req, res, next) {
  //     try {
  //       let comments = await;
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //   async create(req, res, next) {
  //     try {
  //       // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
  //       req.body.creatorId = req.user.sub;
  //       let recipe = await recipeService.create(req.body);
  //       return res.send(recipe);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //   async update(req, res, next) {
  //     try {
  //       let updatedRecipe = await recipeService.update(req.params.id, req.body);
  //       return res.send(updatedRecipe);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //   async delete(req, res, next) {
  //     try {
  //       await recipeService.delete(req.params.id);
  //       return res.send("Recipe deleted!");
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
}
