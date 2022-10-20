class GraphProduct {

    id: any
    name: any
    price: any
    description: any
    photoURL: any
    stock: any

    constructor(id: any, {name, price, description, photoURL, stock}: any) {
        
        this.id = id
        this.name = name
        this.price = price
        this.description = description
        this.photoURL = photoURL
        this.stock = stock
    }
}

export default GraphProduct