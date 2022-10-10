class ICartDAO {
    constructor(){}

    async createNewCart(user: any){
        throw new Error('Cart - createNewCart not Implemented')
    }

    async cartProdDeleteById(user: any){
        throw new Error('Cart - cartProdDeleteById not Implemented')
    }

    async addToCartById(user: any, newProduct: any){
        throw new Error('Cart - addToCartById not Implemented')
    }

    async getProductsByCartId(user: any){
        throw new Error('Cart - getProductsByCartId not Implemented')        
    }

    async deleteProductByCartId(user: any, product: any){
        throw new Error('Cart - deleteProductByCartId not Implemented')
    }
}

export default ICartDAO