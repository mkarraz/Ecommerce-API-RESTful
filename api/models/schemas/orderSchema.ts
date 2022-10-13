import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    products: [{ type: Object, required: true, ref: 'products' }],
    user: {
        type: String, required: true
    },
    timestamp: {
        type: Number,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        default: 'generada'
    },
    number: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('orders', orderSchema)