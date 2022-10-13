import MailSender from '../utils/nodeMailer'
import MessageService from '../utils/messagings'

import m from "../persistence/factory"
const model = m("order")

class OrderService {

    model: any

    constructor(model: any){
        this.model = model
    }

    async getProductsByCartId(user: any){
        //const order = await this.model.createOrder(user)//Creacion de Schema Order


        const data = await this.model.getProductsByCartId(user)
        await this.model.cartProdDeleteById(user)
        
        //eMail to Admin
        await MailSender.newOrder(user, data)
        //SMS to user
        await MessageService.newSMS(user)
        //Whatsapp message to Admin
        await MessageService.newWhatsapp(user)      

        return data
    }
    
}

export default new OrderService(model)