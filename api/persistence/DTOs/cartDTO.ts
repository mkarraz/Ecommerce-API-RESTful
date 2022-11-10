class CartDTO {

    #id: string
    #products: [Object]
    #userId: string   
    #userEmail: string   
    #timestamp: number

    constructor( cart: any ) {
        this.#id = cart.id
        this.#products = cart.products
        this.#userId = cart.userId
        this.#userEmail = cart.userEmail
        this.#timestamp = cart.timestamp      
    }

    getId(){ return { products: this.#id } }
    getProducts() { return { products: this.#products } }
    getUserId(){ return { products: this.#userId } }
    getTimestamp(){ return { products: this.#timestamp } }

    toJson(){
        const cartDisplayed = {
            id: this.#id,
            products: this.#products,
            userId: this.#userId,
            userEmail: this.#userEmail,
            timestamp: this.#timestamp
        }
        return cartDisplayed
    }
}

export default CartDTO