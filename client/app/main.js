import { AuthController } from "./auth/AuthController.js";
import RecipesController from "./controllers/RecipesController.js";
import CommentsController from "./controllers/CommentsController.js";

class App {
  authController = new AuthController();
  recipesController = new RecipesController();
  commentsController = new CommentsController();
}

window["app"] = new App();
