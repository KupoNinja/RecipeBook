export class Comment {
  constructor(data) {
    this.id = data.id;
    this.recipeId = data.recipeId;
    this.creatorId = data.creatorId;
    this.content = data.content;
  }

  get Template() {
    return /* html */ `
      <div>
      </div>
    `;
  }
}
