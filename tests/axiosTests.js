const axios = require('axios')

const instance = axios.create({ baseURL: "http://localhost:8081" })

const getAllProducts = async() => {
    try {
        const response = await axios.get(`http://localhost:8081/api/products`)
        console.log(`getAllProducts Test Response - ${response.data}`)
    } catch (err) {
        console.log(err)
    }
}

const getProductByID = async(productId) => {
    try {
        const response = await axios.get(`http://localhost:8081/api/products/${productId}`)
        console.log(`getProductByID Test Response - ${response.data}`)
    } catch (err) {
        console.log(err)
    }
}

const addProduct = async() => {
    try {
        const response = await axios.post(`http://localhost:8081/api/products`, {
            name: 'prueba',
            price: 54,
            description: 'prueba',
            photoUrl: 'photoURL',
            stock: 10
        })
        console.log(`AddProduct Test Response - ${response.data}`)
    } catch (err) {
        console.log(err)
    }
}

const updateProduct = async(productId) => {
    try {
        const response = await axios.put(`http://localhost:8081/api/products/${productId}`, {
            price: 100
        })
        console.log(`UpdateProduct Test Response - ${response.data}`)
    } catch (err) {
        console.log(err)
    }
}

const deleteProduct = async(productId) => {
    try {
        const response = await axios.delete(`http://localhost:8081/api/products/${productId}`)
        console.log(`getAllProducts Test Response - ${response.data}`)
    } catch (err) {
        console.log(err)
    }
}

getAllProducts()
getProductByID(productId)
addProduct()
updateProduct(productId)
deleteProduct(productId)

module.exports = { instance }