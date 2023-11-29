import commentModel from "../Model/commentModel.js";

class commentService {
  async getAllComments() {
    return commentModel.find({});
  }

  async getCommentById(commentId) {
    return commentModel.findById(commentId);
  }

  async saveComment(data) {
    return commentModel.create(data);
  }
  


    async getCommentsGroupedByTopic() {
        return comment.aggregate([
        { $group: { _id: "$topic", comments: { $push: "$$ROOT" } } }
        ]);
    }
  
  
 
  
}

export default new commentService();
