import mongoose from 'mongoose'
const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    messageId: { //each message has unique id
      type: String,
      required: true,
      unique: true,
      
    },
    //change name to user 
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
const commentModel = mongoose.model('Comment', commentSchema)
export default commentModel

