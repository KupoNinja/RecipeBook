import { AuthController } from "./auth/AuthController.js";
import RecipesController from "./controllers/RecipesController.js";

class App {
  authController = new AuthController();
  recipesController = new RecipesController();
}

window["app"] = new App();
