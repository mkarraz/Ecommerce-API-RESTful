import productSchema from '../../../models/schemas/productSchema'
import IProductDAO from './IProductDAO'
import mongoose from 'mongoose'
import mongoConnection from '../../mongoDB/mongoConnection'
import ProductDTO from '../../DTOs/productDTO'
import Logger from '../../../utils/logger'

class ProductMongoDAO extends IProductDAO {

  model: mongoose.Model<any, {}, {}, {}>
  DTO: any
  static instance: ProductMongoDAO

  constructor(model: mongoose.Model<any, {}, {}, {}>, DTO: ProductDTO) {
    super()
    this.model = model
    this.DTO = DTO
    mongoConnection()
  }

  static getInstance(productSchema: mongoose.Model<any, {}, {}, {}>, DTO: any) {
    if (!this.instance) {
      this.instance = new ProductMongoDAO(productSchema, DTO)
    }
    return this.instance
  }

  public async getAll(): Promise<any[] | any> {
    try {
      const foundItems = await this.model.find()
      const data: any = foundItems.map( entity => 
        new this.DTO(entity).toJson())
      /* const data: any = foundItems.map( entity =>
        new this.DTO(
          entity._id,
          entity.name,
          entity.price,
          entity.description,
          entity.photoURL,
          entity.stock,
          entity.timestamp
        ).toJson()
      ) */
      return data
    } catch (err) {
      Logger.error(`MongoAtlas getAll method error: ${err}`)
    }
  }

  public async getById(id: any): Promise<any | Error> {
    try {
      const foundItem = await this.model.findOne({ _id: id }, { __v: 0 })

      if (foundItem === null) {
        return { error: 'Product not found' }
      } else {
        const data: any = new this.DTO(foundItem).toJson()
        return data
      }
    } catch (err) {
      Logger.error(`MongoAtlas getById method error: ${err}`)
    }
  }

  public async addProduct(product: any): Promise<any | void> {
    try {
      const newProduct = new this.model(product)/* Nuevo prod con formato de objeto basado en el Schema, mediante Model. */
      await newProduct.save()/* Método de guardado de model() */
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

export default ProductMongoDAO.getInstance(productSchema, ProductDTO)
