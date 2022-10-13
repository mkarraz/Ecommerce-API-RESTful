const supertest = require('supertest')
const { expect } = require('chai')
const { generateFakerTestProduct }  = require('./factory.js/productFactory')


let request

describe('API REST FULL - Product Test', () => {
    before(() => {
        request = supertest('http://localhost:8081')
    })

    describe('- GET All Product', async () => {
        it('Should return a 200 status code.', async () => {
            const response = await request.get('/api/products')

            expect(response.status).to.eql(200)
        })
    })

    describe('- GET product by ID', async () => {
        it('Should return a 200 status code.', async () => {
            const testId = '632f5ade841d8dd6737acb62'
            const response = await request.get(`/api/products/${testId}`)

            expect(response.status).to.eql(200)
        })
    })

    describe('- POST Product', async () => {
        it('Should return a 200 status code.', async () => {
            const testProductInput = generateFakerTestProduct()
            const response = await request.post('/api/products').send(testProductInput)

            expect(response.status).to.eql(200)
        })
    })

    describe('- Update product by ID', async () => {
        it('Should return a 200 status code.', async () => {
            const testId = '6347f67ffb50606a9b74a0b5'//Microscope
            const dataToUpdate = { price: 1000 }
            const response = await request.put(`/api/products/${testId}`).send(dataToUpdate)

            expect(response.status).to.eql(200)
        })
    })

    describe('- Delete product by ID', async () => {
        it('Should return a 200 status code.', async () => {
            const testId = '6347f4b956a65ac5c60f6d11'
            const response = await request.delete(`/api/products/${testId}`)

            expect(response.status).to.eql(200)
        })
    })
})