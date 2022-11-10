import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    //products: [{ type: Object, required: true, ref: 'products' }],
    products: [{ 
        productId: { type: String, required: true },
        name:  { type: String, required: true },
        quantity: { type: Number },
        description: { type: String, required: true },
        price: { type: String, required: true },
        photoURL: { type: String, required: true },
        _id : false 
    }],
    userId: { 
        type: String, required: true
    },
    userEmail: { 
        type: String, required: true
    },
    timestamp: {
        type: String,
        required: true,
        default: new Date().toLocaleString(),
    }
})

export default mongoose.model('carts', cartSchema)
