export default class Recipe {
  constructor(data) {
    this.id = data.id;
    this.creatorId = data.creatorId;
    this.creatorImg = data.creatorImg;
    this.creatorName = data.creatorName;
    this.title = data.title;
    this.imgUrl = data.imgUrl || "http://placehold.it/200x200";
    this.ingredients = data.ingredients;
    this.directions = data.directions;
    this.likes = data.likes;
  }

  // NOTE Need to add icon for favorites. Change to unfavorite if favorited.
  // TODO Button to create comment is wrong. Set activeRecipe to only have form.
  // TODO Need to bring in user info.
  get Template() {
    return /* html */ `
      <div class="col-12 col-md-4 col-lg-3">
        <div class="card text-dark">
          <div class="card-title">${this.title}</div>
          <img src="${this.imgUrl}" onerror="this.src='http://placehold.it/200x200'" class="card-img-top" alt="a recipe image">
          <div class="card-body">
            <div class="card-subtitle">Ingredients: ${this.ingredients}</div>
            <p class="card-text">Directions: ${this.directions}</p>
            <button type="button" class="btn btn-primary" onclick="app.recipesController.addALike('${this.id}')"><i class="fas fa-cookie-bite"></i></button>
            <p>${this.likes}</p>
            <div id="favorite"></div>
            <div class="row m-2">
              <p class="mr-2">Created By:</p>
              <img class="rounded-circle" src="${this.creatorImg}" alt="${this.creatorName}" height="45"/>
              <span class="ml-2">${this.creatorName}</span>
            </div>
            <button class="btn btn-primary" onclick="app.commentsController.showCommentForm('${this.id}')">Comment</button>
            <div id="comments-form-${this.id}"></div>
          </div>
          <button class="btn btn-info" onclick="app.recipesController.editRecipe('${this.id}')">Edit</button>
          <button class="btn btn-danger" onclick="app.recipesController.deleteRecipe('${this.id}')">Delete</button>
          <div id="comments-${this.id}"></div>
        </div>
      </div>
    `;
  }
}
