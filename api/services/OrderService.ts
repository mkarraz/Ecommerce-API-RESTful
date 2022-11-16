import m from "../persistence/factory"
const model = m("order")

class OrderService {

    model: any

    constructor(model: any){
        this.model = model
    }

    async createOrder(user: any){
        const order = await this.model.createOrder(user)
        return order
    }
    
}

export default new OrderService(model)