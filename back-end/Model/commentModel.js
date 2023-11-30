import mongoose from 'mongoose'
const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    username: {
      type: String, 
      required: true, 
    }, 
    name: {
      type: String,
      required: true,
    },
    topic: {
        type: String,
        required: true,
      },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// create mongoose Model
export const commentModel = mongoose.model('Comment', commentSchema)

