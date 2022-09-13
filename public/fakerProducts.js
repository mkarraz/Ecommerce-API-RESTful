const fetchMockProducts = async () => {
    try {
        const fakerProducts = await fetch('/api/products-test')
        return fakerProducts.json()

    } catch (error) {
        console.log(`Han error has ocurred at fetchMockProducts function: ${error}`)
    }
}

const renderFakerProducts = async (products) => {
    try {
        const template = await fetch('./partials/faker.hbs')
        const hbsTemplateCompiled = Handlebars.compile(await template.text())
        document.getElementById('fakerProd').innerHTML = hbsTemplateCompiled({products})
    } 
    catch (error) {
        console.log(`Han error has ocurred at renderProducts function: ${error}`)
    }
}


fetchMockProducts()
    .then(products => {
        renderFakerProducts(products)
    })