class IOrderDAO {
    constructor(){}

    async createOrder (user: any){
        throw new Error('Order - createOrder not Implemented')
    }

}

export default IOrderDAO