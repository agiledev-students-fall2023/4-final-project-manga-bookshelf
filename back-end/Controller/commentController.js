import app from "../app.mjs"
import commentService from '../Service/commentService.js';
import express from "express";

//const BASE_ROUTE_COMMENT = "comment"
//change commentController
  const commentRouter = express.Router();
  commentRouter.get("/test", (req, res, next)=> {
    res.json({message: "hi"})
  })
  commentRouter.get(`/comments`, commentService.getAllComments);
  commentRouter.get(`/comments/:commentId`, commentService.getCommentById);
  commentRouter.post(`/comments/save`, commentService.saveComment);
  commentRouter.get(`/grouped`, commentService.getCommentsByTopic);
  /*
  async getAllMessages(req, res) {
    try {
      const comments = await commentService.getAllMessages();
      res.json({ comments, status: 'all good' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err, status: 'failed to retrieve comments' });
    }
  },

  async getCommentById(req, res) {
    try {
      const comment = await commentService.getCommentById(req.params.commentId);
      res.json({ comment, status: 'all good' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err, status: 'failed to retrieve comment' });
    }
  },

  async saveComment(req, res) {
    try {
      const comment = await commentService.saveComment(req.body);
      res.json({ comment, status: 'all good' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err, status: 'failed to save the comment' });
    }
  },
  
  async getCommentsByTopic(req, res) {
    try {
      const groupedComments = await commentService.getCommentsGroupedByTopic();
      res.json(groupedComments);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Failed to retrieve comments' });
    }
  }
  */


export default commentRouter;

/*
// load the dataabase models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')
// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})
// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})



module.exports = app // CommonJS export style!
*/
