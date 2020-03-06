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
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.getComments)
      .post("", this.create);
    // TODO Need to make Roles in Auth0 so only the user who created can edit or delete.
  }

  async getComments(req, res, next) {
    try {
      let comments = await commentService.getAllByRecipeId(req.query.recipeId);
      res.send(comments);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.user.sub;
      req.body.creatorName = req.userInfo.name;
      req.body.creatorImg = req.userInfo.picture;
      return res.send(await commentService.create(req.body));
    } catch (error) {
      next(error);
    }
  }
}
