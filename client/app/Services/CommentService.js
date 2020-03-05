import { resource } from "../resource";
import store from "../store";

class CommentService {
  // TODO Need to take in data... Not just the recipeId
  async createComment(commentData) {
    let data = resource.post("api/comments", commentData);
    let newComment = new Comment(data);
    store.State.recipes.push(newComment);
    // TODO Need to do comments in store
    //   store.commit("comments", comments)
  }
}

export const commentService = new CommentService();
