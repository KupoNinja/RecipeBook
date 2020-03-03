export default class Recipe {
  constructor(data) {
    this.id = data.id;
    this.creatorId = data.creatorId;
    this.title = data.title;
    this.imgUrl = data.imgUrl;
    this.ingredients = data.ingredients;
    this.directions = data.directions;
    this.likes = data.likes;
  }

  // NOTE Need to add these recipesController functions
  // NOTE Need to add icon for like. Increase number for like every time icon is clicked.
  // NOTE Need to add icon for favorites. Change to unfavorite if favorited.
  get Template() {
    return /* html */ `
     <div class="col-12 col-md-4 col-lg-3">
        <div class="card">
            <div class="card-title">${this.title}</div>
            <img src="${this.imgUrl}" class="card-img-top" alt="a recipe image">
            <div class="card-body">
                <div class="card-subtitle">Ingredients: ${this.ingredients}</div>
                <p class="card-text">Directions: ${this.directions}</p>
                <div>Likes: ${this.likes}</div>
            </div>
            <button class="btn btn-info" onclick="app.recipesController.editRecipe('${this.id}')">Edit</button>
            <button class="btn btn-danger" onclick="app.recipesController.deleteRecipe('${this.id}')">Delete</button>
        </div>
     </div>
    `;
  }
}
