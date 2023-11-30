import commentModel from "../Model/commentModel.js";

class commentService {
  async getAllComments(req, res) {
    try {
      const comments = await commentModel.find({});
      res.json({ comments, status: 'all good' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err, status: 'failed to retrieve comments' });
    }
  }

  async getCommentById(req, res) {
    try {
      const comment = await commentModel.findById(req.params.commentId);
      res.json({ comment, status: 'all good' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err, status: 'failed to retrieve comment' });
    }
  }

  async saveComment(req, res) {
    try {
      const comment = await commentModel.create(req.body);
      res.json({ comment, status: 'all good' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err, status: 'failed to save the comment' });
    }
  }

  async getCommentsByTopic(req, res) {
    try {
      const groupedComments = await commentModel.aggregate([
        { $group: { _id: "$topic", comments: { $push: "$$ROOT" } } }
      ]);
      res.json(groupedComments);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Failed to retrieve comments' });
    }
  }
  //don't need this
 /*
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
*/
}
export default new commentService();
