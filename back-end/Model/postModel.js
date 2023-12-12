import mongoose from 'mongoose'

const Schema = mongoose.Schema

//creator is the person who created post
//title is what they want to say
//body is what they say in body 
//likes is the number of likes (default at 0) 
//comments is an array of objects of comment schema 
const postSchema = new Schema(
    {
        creator: {
            type: String,
            required: true,
        },
        creatorId:{
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        likes:{
            type: Number, 
            required: true,
            default: 0
        },
        comments: [{
            type: Schema.Types.ObjectId, 
            ref: "CommentV2"
        }]
    },
    {
        timestamps: true,
    }
)

// create mongoose Model
const postModel = mongoose.model('Posts', postSchema)
export default postModel

