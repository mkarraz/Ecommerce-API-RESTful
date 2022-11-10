import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: {
        type: String, required: true
    },
    products: [{ type: Object, required: true, ref: 'products' }],
    status: {
        type: String,
        default: 'generada'
    },
    timestamp: {
        type: String,
        required: true,
        default: new Date().toLocaleString(),
    }
})

export default mongoose.model('orders', orderSchema)