import store from "../store.js";
import { commentService } from "../Services/CommentService.js";

// TODO Draw this form in card?
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

function _drawComments() {}

export default class CommentsController {
  constructor() {
    // TODO Fix this...
    // store.subscribe("comments", _drawComments);
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
    } catch (error) {
      console.log(error);
    }
  }
}
