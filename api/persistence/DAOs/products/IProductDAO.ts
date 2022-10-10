class IProductDAO {
    constructor(){}

    async getById(id: any){
        throw new Error('Product - getById not Implemented')
    }

    async getAll(){
        throw new Error('Product - getAll not Implemented')
    }

    async addProduct(product: any){
        throw new Error('Product - addProduct not Implemented')
    }

    async updateProductById(id: any, newData: any){
        throw new Error('Product - updateProductById not Implemented')        
    }

    async deleteProductById(id: any){
        throw new Error('Product - deleteProductById not Implemented')
    }
}

export default IProductDAO