//import { faker } from "@faker-js/faker"
const { faker } = require('@faker-js/faker')

faker.locale = 'es'

const generateFakerTestProduct = () => {
    return {
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        photoURL: faker.image.imageUrl(),
        stock: Number(faker.random.numeric())
    }
}

module.exports = { generateFakerTestProduct } 