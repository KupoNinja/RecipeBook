import store from "../store.js";
import { commentService } from "../Services/CommentService.js";

function _drawCommentForm(recipeId) {
  let template = /* html */ `
      <form id="comment-form" onsubmit="app.commentsController.createComment('${recipeId}')">
        <div class="form-group">
          <textarea name="content" class="form-control"></textarea>
        </div>
        <button type="submit">Submit Comment</button>
      </form>
    `;
  document.getElementById(`comments-form-${recipeId}`).innerHTML = template;
}

function _drawComments() {
  let comments = store.State.comments;
  let template = "";
  comments.forEach(c => (template += c.Template));
  // TODO  Need to make id unique... Multiple recipe cards have the same id="comments"
  // Look at above example
  document.getElementById(`comments-`).innerHTML = template;
}

export default class CommentsController {
  constructor() {
    store.subscribe("comments", _drawComments);
  }

  showCommentForm(recipeId) {
    _drawCommentForm(recipeId);
  }

  async createComment(recipeDataId) {
    try {
      event.preventDefault();
      let form = event.target;
      let commentData = {
        recipeId: recipeDataId,
        // @ts-ignore
        content: form.content.value
      };
      await commentService.createComment(commentData);
      _drawComments();
    } catch (error) {
      console.log(error);
    }
  }
}
