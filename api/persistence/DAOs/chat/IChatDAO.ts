class IChatDAO {
    constructor(){}

    async addMessage(newMessage: String){
        throw new Error('Chat - addMessage not Implemented')
    }

    async getMessages(){
        throw new Error('Chat - getMessages not Implemented')
    }

}

export default IChatDAO