import fs from 'fs'
import FilesystemContainer from '../../containers/fsContainer'
import { Error, Product, StoredProduct } from '../../../interfaces'

class ProductsDAOFilesystem extends FilesystemContainer {
    constructor() {
        super('./api/DB/products.txt')
    }

    private readonly writeFile = async (data: Array<Product>): Promise<void> => {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data))
        } catch (err: any) {
            console.log('Method writeFile: ', err)
        }
    }

    private readonly readFile = async (): Promise<StoredProduct[]> => {
        try {
            return (await fs.promises.readFile(this.filePath, 'utf8'))
                ? JSON.parse(await fs.promises.readFile(this.filePath, 'utf8'))//Si el archivo contiene algo, lo parsea.
                : ([] as StoredProduct[])//Si el archivo está vacío, devuelve un array vacío.
        } catch (err: any) {
            //Si el archivo NO existe, entonces lo crea.
            if (err.errno === -2) {
                try {
                    await fs.promises.writeFile(this.filePath, JSON.stringify([]))
                    return [] as StoredProduct[]
                } catch (err: any) {
                    console.error('Could not create file in such directory. ', err)
                }
            } else {
                console.log('Method readFile: ', err)
            }
            return [] as StoredProduct[]
        }
    }

    public async getAll(): Promise<StoredProduct[]> {
        return await this.readFile()
    }

    public async getById(id: number): Promise<StoredProduct | Error> {
        try {
            const fileData: StoredProduct[] = await this.readFile()
            return (
                fileData.find((object: StoredProduct) => object.id === Number(id)) ?? {
                    error: 'Product not found',
                }
            )
        } catch (err: any) {
            console.log('Method getById: ', err)
        }
        return { error: 'fetch item method failed' }
    }

    public async addProduct(product: Product): Promise<number | void> {
        try {
            const fileData: StoredProduct[] = await this.readFile()
            const id: number =
                fileData.length === 0
                    ? 1
                    : Math.max(...fileData.map((object: StoredProduct) => object.id)) + 1

            const timestamp = new Date().toLocaleString("es-AR")

            fileData.push({ ...product, id, timestamp })
            await this.writeFile(fileData)
            return id
        } catch (err: any) {
            console.log('Method addProduct: ', err)
        }
    }

    public async updateProductById(id: number, product: Product): Promise<any | void | Error> {
        try {
            const fileData: StoredProduct[] = await this.readFile()//Almaceno todo el array de productos
            const newFileData: StoredProduct[] = fileData.map(
                (object: StoredProduct) =>
                    object.id === Number(id) ? { ...object, ...product } : object
            )
            await this.writeFile(newFileData)
            return { msg: 'Product succesfully updated!' }
        } catch (err: any) {
            console.log('Method updateProductById: ', err)
        }
    }

    public async deleteProductById(id: number): Promise<string | void> {
        try {
            const fileData: StoredProduct[] = await this.readFile()
            const newFileData: StoredProduct[] = fileData.filter(
                (object: StoredProduct) => object.id !== Number(id)
            )
            if (fileData.length === newFileData.length) {
                const msg = `There is NO product with id= ${id}`
                return msg
            } else {
                await this.writeFile(newFileData)
                const msg = `Product id: ${id}, succesfully deleted!`
                return msg
            }
        } catch (err: any) {
            console.log('Method deleteProductById: ', err)
        }
    }
}

export default new ProductsDAOFilesystem()