import { resource } from "../resource.js";
import store from "../store.js";
import Comment from "../Models/Comment.js";

class CommentService {
  debugger;
  async createComment(commentData) {
    let data = await resource.post("api/comments", commentData);
    let newComment = new Comment(data);
    store.State.comments.push(newComment);
    store.commit("comments", store.State.comments);
  }
}

export const commentService = new CommentService();
