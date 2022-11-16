import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
    mail: { type: String, required: true },
    body: { type: String, required: true },
    timestamp: {
        type: String,
        required: true
    }
})

export default mongoose.model('chats', chatSchema)