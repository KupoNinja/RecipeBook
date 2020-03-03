export default class Recipe {
  constructor(data) {
    this._id = data._id;
    this.creatorId = data.creatorId;
    this.title = data.title;
    this.imgUrl = data.imgUrl;
    this.ingredients = data.ingredients;
    this.directions = data.directions;
    this.likes = data.likes;
  }

  // NOTE Need to add these recipesController functions
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
            <button class="btn btn-info" onclick="app.recipesController.editRecipe('${this._id}')">Edit</button>
            <button class="btn btn-danger" onclick="app.recipesController.deleteRecipe('${this._id}')">Delete</button>
        </div>
     </div>
        `;
  }
}
