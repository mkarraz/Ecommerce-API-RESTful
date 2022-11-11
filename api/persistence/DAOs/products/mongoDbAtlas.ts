import productSchema from '../../../models/schemas/productSchema'
import IProductDAO from './IProductDAO'
import mongoose from 'mongoose'
import mongoConnection from '../../mongoDB/mongoConnection'
import ProductDTO from '../../DTOs/productDTO'
import Logger from '../../../utils/logger'

const objectId = mongoose.Types.ObjectId

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
      return foundItems.map(entity => new this.DTO(entity).toJson())
    } catch (err) {
      Logger.error(`MongoAtlas getAll method error: ${err}`)
    }
  }

  public async getById(id: any): Promise<any | Error> {
    try {

      if (!objectId.isValid(id)) return undefined

      const foundItem = await this.model.findById(id)

      if (!foundItem) return null

      return new this.DTO(foundItem).toJson()

    } catch (err) {
      Logger.error(`MongoAtlas getById method error: ${err}`)
    }
  }

  public async getByCategory(category: any): Promise<any | Error> {
    try {

      const foundItems = await this.model.find({ category: { $in: `${category}` } })

      if (!foundItems) return null

      return foundItems.map(entity => new this.DTO(entity).toJson())

    } catch (err) {
      Logger.error(`MongoAtlas getById method error: ${err}`)
    }
  }

  public async addProduct(productInputs: any): Promise<any | void> {
    try {
      const newProduct = new this.model(productInputs)
      const data = await newProduct.save()

      return new this.DTO(data).toJson()

    } catch (err) {
      Logger.error(`MongoAtlas addProduct method error: ${err}`)
    }
  }

  public async updateProductById(id: any, newData: any): Promise<any> {
    try {
      const updatedData = await this.model.updateOne({ _id: id }, newData)

      if (updatedData.matchedCount === 0) {
        return { error: 'Product not found.' }
      } else {
        return this.getById(id)
      }
    } catch (err) {
      Logger.error(`MongoAtlas updateProductById method error: ${err}`)
    }
  }

  public async deleteProductById(id: any): Promise<any> {
    try {
      const entity = await this.getById(id)

      if (!entity) return undefined

      await this.model.deleteOne({ _id: id })

      return entity

    } catch (err) {
      Logger.error(`MongoAtlas deleteProductById method error: ${err}`)
    }
  }
}

export default ProductMongoDAO.getInstance(productSchema, ProductDTO)
