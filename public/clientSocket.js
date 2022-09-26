const socket = io()

const productsList = document.querySelector('#currentProd')
const addProdForm = document.querySelector('#addProd')
const prodTitleInput = document.querySelector('#prodTitle')
const prodPriceInput = document.querySelector('#prodPrice')
const prodThumbnailInput = document.querySelector('#prodThumbnail')

const formMessage = document.querySelector('#formMessage')
const userEmailInput = document.querySelector('#userEmailInput')
const userName = document.querySelector('#userName')
const userLastName = document.querySelector('#userLastName')
const userAge = document.querySelector('#userAge')
const userNickName = document.querySelector('#userNickName')
const userAvatar = document.querySelector('#userAvatar')
const messageInput = document.querySelector('#messageInput')
const messagesPool = document.querySelector('#messagesPool')

const sendMessage = () => {
    try {
        let time = new Date().toLocaleDateString('es-AR')

        const messageToSend = {
            author: {
                userEmail: userEmailInput.value,
                name: userName.value,
                lastName: userLastName.value,
                age: userAge.value,
                nickName: userNickName.value,
                avatar: userAvatar.value,
            },
            text: messageInput.value,
            time: time
        }

        socket.emit('client:message', messageToSend)

    } catch (error) {
        console.log(`Han error has ocurred in sendMessage(); ${error}`)
    }
}

const renderMessages = async (messagesArray) => {
    try {
        const chatTemplate  = await fetch('./partials/chat.hbs')
        const hbsChatTemplateCompiled = Handlebars.compile(await chatTemplate.text())/* Compila la plantilla */
        messagesPool.innerHTML = hbsChatTemplateCompiled({messagesArray})

    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}

const showNewProd = () => {
    try {
        const name = prodTitleInput.value
        const prodPrice = prodPriceInput.value
        const price = Number(prodPrice)
        const photoURL = prodThumbnailInput.value

        socket.emit('client:product', { name, price, photoURL })
    } catch (error) {
        console.log(`Han error has ocurred; ${error}`)
    }
}

const renderProducts = async (products) => {
    try {
        const prodTemplate = await fetch('./partials/product.hbs')
        const hbsProdTemplateCompiled = Handlebars.compile(await prodTemplate.text())

        productsList.innerHTML = hbsProdTemplateCompiled({
            products,
        })
    } catch (error) {
        console.log(`Han error has ocurred; ${error}`)
    }
}

/* EVENT LISTENER */

addProdForm.addEventListener('submit', event => {
    event.preventDefault()
    showNewProd()
    prodTitleInput.value = ''
    prodPriceInput.value = ''
    prodThumbnailInput.value = ''
})

formMessage.addEventListener('submit', event => {
    event.preventDefault()
    sendMessage()
    messageInput.value = ''
})

/* SERVER LISTENER */

socket.on('server:products', products => {
    renderProducts(products)
})

socket.on('server:message', renderMessages)
