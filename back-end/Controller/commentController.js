import app from "../app.mjs"
import commentService from '../Service/commentService.js';
import express from "express";

const BASE_ROUTE_COMMENT = "comment"

const commentRouter = express.Router();
commentRouter.get("/test", (req, res, next)=> {
  res.json({message: "hi"})
})
commentRouter.get(`/comments`, commentService.getAllComments);
commentRouter.get(`/comments/:commentId`, commentService.getCommentById);
commentRouter.post(`/comments/save`, commentService.saveComment);
commentRouter.get(`/grouped`, commentService.getCommentsByTopic);

export default commentRouter;

