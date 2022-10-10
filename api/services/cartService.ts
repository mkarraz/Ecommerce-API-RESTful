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
    
    async cartProdDeleteById(user: any){
        const data = await this.model.cartProdDeleteById(user)
        return data
    }
    
    async getProductsByCartId(user: any){
        const data = await this.model.getProductsByCartId(user)
        return data
    }
    
    async addToCartById(user: any, product: any){
        const data = await this.model.addToCartById(user, product)
        return data
    }
    
    async deleteProductByCartId(user: any, product: any){
        const data = await this.model.deleteProductByCartId(user, product)
        return data
    }
}

export default new CartService(model)