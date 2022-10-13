import m from '../persistence/factory'
const model = m('products')

class ProductService {

    /* const model = m('products') */
    model: any

    constructor(model: any) {
        this.model = model
    }

    async getAllProducts() {
        const data = await this.model.getAll()
        return data
    }

    async getProductById(id: any) {
        //const data = await this.model.getById(Number(id))
        const data = await this.model.getById(id)
        return data
    }

    async addProduct(productInputs: any) {
        const data = await this.model.addProduct(productInputs)
        return data
    }

    async updateProductById(id: any, dataUpdate: any) {
        const data = await this.model.updateProductById(id, dataUpdate)
        return data
    }

    async deleteProductById(id: any) {
        const data = await this.model.deleteProductById(id)
        return data
    }
}

export default new ProductService(model)