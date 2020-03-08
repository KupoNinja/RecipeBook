export default class Favorite {
  constructor(data) {
    this.id = data.id;
    this.recipeId = data.recipeId;
    this.userId = data.userId;
  }

  get Template() {
    // NOTE Change btn-info to another color if favorited.
    return /* html */ `
      <button class="btn btn-info"><i class='fas fa-star' onclick="app.favoritesController.addAFavorite('${this.id}')"></i></button>;
    `;
  }
}
