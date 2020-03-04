import store from "../store";
import { commentService } from "../Services/CommentService";

// TODO Draw this form in card?
function _drawCommentForm() {
  let template = /* html */ `
      <form id="comment-form" onsubmit="app.commentsController.createComment()">
        <input name="id" type="text" class="d-none" disabled />
        <div class="form-group">
          <textarea name="content" class="form-control"></textarea>
        </div>
        <button type="submit">Comment</button>
      </form>
    `;
  document.getElementById("comment-box").innerHTML = template;
}

export default class CommentsController {
    constructor() {
    // TODO Fix this...
    // store.subscribe("comments", _drawComments);
  }

  async createComment(recipeId) {
    try {
      await commentService.createComment(recipeId);
    } catch (error) {
      console.log(error);
    }
  }