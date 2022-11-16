const socket = io()

const formMessage = document.querySelector('#formMessage')
const userEmailInput = document.querySelector('#userEmailInput')
const messageInput = document.querySelector('#messageInput')
const messagesPool = document.querySelector('#messagesPool')

const sendMessage = () => {
    try {

        const messageToSend = {
            mail: userEmailInput.value,
            body: messageInput.value,
            timestamp: new Date().toLocaleString('es-AR')
        }

        socket.emit('client:message', messageToSend)

    } catch (error) {
        console.log(`Han error has ocurred in sendMessage(); ${error}`)
    }
}

const renderMessages = async (messagesArray) => {
    try {
        const chatTemplate  = await fetch('../chat.hbs')
        const hbsChatTemplateCompiled = Handlebars.compile(await chatTemplate.text())/* Compila la plantilla */
        messagesPool.innerHTML = hbsChatTemplateCompiled({messagesArray})

    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}


/* EVENT LISTENER */

formMessage.addEventListener('submit', event => {
    event.preventDefault()
    sendMessage()
    messageInput.value = ''
})

/* SERVER LISTENER */

socket.on('server:message', renderMessages)
