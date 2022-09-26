import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    products: [{ type: Object, required: true, ref: 'products' }],
    user: { 
        type: String, required: true
    },
    timestamp: {
        type: Number,
        required: true,
        default: Date.now,
    }
})

export default mongoose.model('carts', cartSchema)
