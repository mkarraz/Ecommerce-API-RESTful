import fs from 'fs'
import FileSystemContainer from '../../containers/fsContainer'
import normalizeAndDenormalize from '../../../utils/normalizr'
import util from 'util'
import Logger from '../../../utils/logger'

function print(objeto: any) {
    Logger.info(util.inspect(objeto, false, 12, true));
  }

class daoChatFileSystem extends FileSystemContainer {
    constructor(){
        super('./DB/chat.json')
    }

    public async readChatFromFile() {
        try {
            const message: any = await fs.promises.readFile(this.filePath, 'utf8')
            const messageList = JSON.parse(message)

            const messageListDenormalized = normalizeAndDenormalize('denormalize', messageList)
            Logger.info("Denormalized")
            print(messageListDenormalized)
            return messageListDenormalized

        } catch (err) {
            Logger.error("File cannot be read " + err)
        }
    }

    public async writeChatToFile(messagesArray: any) {
        
        try {
            const messageListNormalized = normalizeAndDenormalize('normalize', messagesArray)
            Logger.info("Normalized")
            print(messageListNormalized)
            await fs.promises.writeFile(this.filePath, JSON.stringify(messageListNormalized))

        } catch (err) {
            Logger.error("File cannot be written " + err)
        }
    }

}

export default new daoChatFileSystem