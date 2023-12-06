import commentModel from "../Model/commentModel.js";

class commentService {
   
  async getAllComments(req, res) {
    try {
      const comments = await commentModel.find({}).populate('user', 'username'); // Populate the user field
      res.json({ comments, status: 'all good' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message, status: 'failed to retrieve comments' });
    }
  }

  async getCommentById(req, res) {
    try {
      const comment = await commentModel.findById(req.params.commentId).populate('user', 'username');
      res.json({ comment, status: 'all good' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message, status: 'failed to retrieve comment' });
    }
  }
  

  async saveComment(req, res) {
    console.log(req.body); 
    try {
      // Assume req.body contains { userId, topic, comment }
      const newComment = {
        username:req.body.username,
        //user: req.body.userId,
        topic: req.body.topic,
        comment: req.body.comment,
      };
      const comment = await commentModel.create(newComment);
      res.json({ comment, status: 'all good' });
    } catch (err) {
      console.error('Error saving comment:', err);
      res.status(400).json({ message: err.message });
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
}


export default new commentService();