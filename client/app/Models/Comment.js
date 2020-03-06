export default class Comment {
  constructor(data) {
    this.id = data.id;
    this.recipeId = data.recipeId;
    this.creatorId = data.creatorId;
    this.content = data.content;
  }

  get Template() {
    return /* html */ `
      <div class="row">
        <div class="col-sm-12">
          <div class="row">
            <div class="col-sm-1">
              <div class="thumbnail">
                <img class="img-responsive user-photo" src="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-5">
        <div class="panel panel-default">
            <div class="panel-heading">
                <strong>${userAvatar}</strong> <span class="text-muted">commented 5 days ago</span>
            </div>
            <div class="panel-body">
            ${this.content};
            </div>
        </div>
      </div>
    `;
  }
}
