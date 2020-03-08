import { AuthController } from "./auth/AuthController.js";
import RecipesController from "./controllers/RecipesController.js";
import CommentsController from "./controllers/CommentsController.js";
import FavoritesController from "./controllers/FavoritesController.js";

class App {
  authController = new AuthController();
  recipesController = new RecipesController();
  commentsController = new CommentsController();
  favoritesController = new FavoritesController();
}

window["app"] = new App();
