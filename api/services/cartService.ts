import m from "../persistence/factory"
const model = m("cart")

class CartService {

    model: any

    constructor(model: any){
        this.model = model
    }

    async createNewCart(user: any){
        const data = await this.model.createNewCart(user)
        return data
    }
    
    async deleteCartProducts(user: any){
        const data = await this.model.deleteCartProducts(user)
        return data
    }
    
    async getProductsByCartId(user: any){
        return await this.model.getProductsByCartId(user)
        //return data
    }
    
    async addToCartById(user: any, productId: any, quantity: any){
        const data = await this.model.addToCartById(user, productId, quantity)
        return data
    }
    
    async deleteProductByCartId(user: any, productId: any){
        const data = await this.model.deleteProductByCartId(user, productId)
        return data
    }
}

export default new CartService(model)