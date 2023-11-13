import mongoose from 'mongoose'

const User = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    salt: String,
    role: {
        type: String,
        default: 'user',
    }
})

export default mongoose.model(User)