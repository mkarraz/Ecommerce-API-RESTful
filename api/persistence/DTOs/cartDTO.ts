class CartDTO {

    #id: string
    #products: [Object]
    #userId: string   
    #timestamp: number

    constructor( cart: any ) {
        this.#id = cart._id
        this.#products = cart.products
        this.#userId = cart.user
        this.#timestamp = cart.timestamp      
    }

    getId(){ return this.#id }
    getProducts(){ return { product: this.#products } }
    getUserId(){ return this.#userId }
    getTimestamp(){ return this.#timestamp }   

    toJson(){
        const cartDisplayed = {
            id: this.#id,
            product: this.#products,
            userId: this.#userId,
            timestamp: this.#timestamp
        }
        return cartDisplayed.product
    }
}

export default CartDTO