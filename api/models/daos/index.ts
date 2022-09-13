import dotenv from 'dotenv'

dotenv.config()

let chatDao: any

switch (process.env.DB_PROVIDER) {
    case 'fs':
        import('./chat/daoChatFileSystem').then((dao) => (chatDao = dao.default))
        break

    case 'sqlite':
        import('./chat/daoChatSQLite').then((dao) => (chatDao = dao.default))
        break

    default:
        chatDao = require('./chat/daoChatFileSystem')
        break;
}

export { chatDao }