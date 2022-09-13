import { Product, StoredProduct } from '../interfaces'
import Logger from '../utils/logger'

class MemoryContainer {
    memoryProducts: StoredProduct[]

    constructor() {
        this.memoryProducts = []
    }

    public async addMemoryProduct(product: Product): Promise<StoredProduct | void> {
        try {
            const id: number =
                this.memoryProducts.length === 0
                    ? 1
                    : Math.max(...this.memoryProducts.map((object: StoredProduct) => object.id)) + 1

            const timestamp = new Date().toLocaleString("es-AR")

            const newMemorArray = { ...product, id, timestamp }
            this.memoryProducts.push(newMemorArray)
            return newMemorArray

        } catch (err: any) {
            Logger.error(`Method: addMemoryProduct. ${err}`)
        }
    }
}

export default MemoryContainer