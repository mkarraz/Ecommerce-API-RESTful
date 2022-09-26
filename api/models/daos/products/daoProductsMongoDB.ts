import MongoDBContainer from '../../containers/mongoDBContainer'
import productSchema from '../../schemas/productSchema'

class ProductsDAOMongoDB extends MongoDBContainer {
  constructor() {
    super(productSchema)
  }

  public async getAll(): Promise<any[] | any> {
    try {
      const foundItems = await this.model.find({})
      return foundItems
      
    } catch (err) {
      console.log('Method getAll: ', err)
    }
    
  }

  public async getById(id: any): Promise<any | Error> {
    try {
      const foundItem = await this.model.findOne({ _id: id }, { __v: 0 })

      if (foundItem === null) {
        return { error: 'Product not found' }
      } else {
        return foundItem
      }
    } catch (err) {
      console.log('Method getById: ', err)
    }
  }

  public async addProduct(product: any): Promise<any | void> {
    try {
      const newProduct = new this.model(product)/* Nuevo prod con formato de objeto basado en el Schema, mediante Model. */
      const productAdded = await newProduct.save()/* Método de guardado de model() */

      return productAdded
    } catch (err) {
      console.log('Method add: ', err)
    }
  }

  public async updateProductById(id: any, newData: any): Promise<any> {
    try {
      const updatedData = await this.model.updateOne({ _id: id }, newData)

      if (updatedData.matchedCount === 0) {
        return { error: 'Product not found.' }
      } else {
        return { msg: `Product id: ${id} updated!` }
      }
    } catch (err) {
      console.log('Method update: ', err)
    }
  }

  public async deleteProductById(id: any): Promise<any> {
    try {
      const deletedData = await this.model.deleteOne({ _id: id })

      if (deletedData.deletedCount === 0) {
        return { error: 'Product not found.' }
      } else {
        return { msg: `Product id: ${id} deleted!` }
      }
    } catch (err) {
      console.log('Method deleteById: ', err)
    }
  }
}

export default new ProductsDAOMongoDB()
