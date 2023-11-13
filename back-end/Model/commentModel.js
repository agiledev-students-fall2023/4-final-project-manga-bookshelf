import mongoose from 'mongoose'
const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
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

// export the model so other modules can import it
module.exports = {
    commentModel,
}
