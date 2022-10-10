import m from '../persistence/factory'
const model = m('products')

class ProductService {

    /* const model = m('products') */
    model: any

    constructor(model: any){
        this.model = model
    }

    async getAllProducts(){
        const data = await this.model.getAll()
        return data
    }
    
    async getProductById(id: any){
        const data = await this.model.getById(Number(id))
        return data
    }
    
    async addProduct(product: any){
        const data = await this.model.addProduct(product)
        return data
    }
    
    async updateProductById(id: any, product: any){
        const data = await this.model.updateProductById(Number(id), product)
        return data
    }
    
    async deleteProductById(id: any){
        const data = await this.model.deleteProductById(Number(id))
        return data
    }
}

export default new ProductService(model)