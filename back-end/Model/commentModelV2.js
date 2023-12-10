import mongoose from 'mongoose'
const Schema = mongoose.Schema
const commentSchemaV2 = new Schema(
    {
        //change name to user 
        usernameId:{
            type: String
        }, 
        username: {
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
const commentModelV2 = mongoose.model('CommentV2', commentSchemaV2)
export default commentModelV2

