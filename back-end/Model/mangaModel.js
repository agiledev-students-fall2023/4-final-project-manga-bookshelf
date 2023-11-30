import mongoose from 'mongoose'
const Schema = mongoose.Schema

const mangaSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        authorName: {
            type: String,
            required: false,
        },
        authorImage: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        __id: {
            type: String, 
            required: true, 
        }
    }
)

// create mongoose Model
export const mangaModel = mongoose.model('Manga', mangaSchema)