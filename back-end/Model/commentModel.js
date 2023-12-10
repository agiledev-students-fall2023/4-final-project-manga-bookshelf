import mongoose from 'mongoose'
const Schema = mongoose.Schema
const commentSchema = new Schema(
  {
    //change name to user 
    username: { 
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
const commentModel = mongoose.model('commentV2', commentSchema)
export default commentModel

