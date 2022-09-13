import { Error, Product, StoredProduct } from '../interfaces'
import { Knex } from 'knex'
import { mariaDBOption } from '../../DB/configDB'
import Logger from '../utils/logger'


class DBProductsContainer {

    private db: Knex
    private table: string

    constructor(options: any, table: string) {
        this.db = require('knex')(options)
        this.table = table
        this.createTableIfNotExists()
    }

    private async createTableIfNotExists(): Promise<void> {
        if (!(await this.db.schema.hasTable(this.table))) {
            try {
                await this.db.schema.createTableIfNotExists(this.table, (table) => {
                    table.increments('id').primary()
                    table.string('title')
                    table.integer('price')
                    table.string('thumbnail')
                    table.integer('timestamp')
                });
            } catch (err) {
                Logger.error(`Method: createTableIfNotExists, ${err}`)
            }
        }
    }

    public async getAll(): Promise<StoredProduct[]> {

        const products: StoredProduct[] = await this.db.select('*').from(this.table)
        return products

    }

    public async getById(id: number): Promise<StoredProduct | Error> {
        try {
            const product: StoredProduct = await this.db.select('*').where('id', id).from(this.table)

            if (product) {
                return product
            }
            else {
                return { error: 'Product not found' }
            }
        } catch (err: any) {
            Logger.error(`Method: getById, ${err}`)
        }
        return { error: 'Fetch item method failed' }
    }

    public async addProduct(product: Product): Promise<void> {
        try {
            const timestamp = Date.now()
            await this.db.insert({ ...product, timestamp }).into(this.table)
        }
        catch (err: any) {
            Logger.error(`Method: addProduct, ${err}`)
        }
    }

    public async updateProductById(id: number, product: Product): Promise<void | Error> {
        try {
            await this.db.where('id', id)
                .update({ title: product.name, price: product.price, thumbnail: product.photoURL })
                .from(this.table)
        } catch (err: any) {
            Logger.error(`Method: updateProductById, ${err}`)
        }
    }

    public async deleteProductById(id: number): Promise<void | Error> {
        try {
            await this.db.delete('*').where('id', id).from(this.table)
        } catch (err: any) {
            Logger.error(`Method: deleteProductById, ${err}`)
        }
    }
}

export default new DBProductsContainer(mariaDBOption, 'products')