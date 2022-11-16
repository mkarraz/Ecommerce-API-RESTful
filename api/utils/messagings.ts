import config from '../config'
import twilio from 'twilio'
import Logger from './logger'



const accountSid = config.TWILIO_ACCOUNTSID
const authToken = config.TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)

class MessageService{
    
    async newSMS(user: any){
        try{ 
            await client.messages.create({
                body: `Your order has been received and is being process`,
                from: config.TWILIO_NUMBER,
                to: user.phoneNumber
            })
        } catch(err){
            Logger.error(`An error has occurred when sending SMS: ${user.email}`)
        }
    }   

    async newWhatsapp(user: any){
        try{ 
            await client.messages.create({
                body: `New order from ${user.name} - ${user.email}`,
                from: `whatsapp:${config.TWILIO_WHATSAPP}`,
                to: `whatsapp:${config.TWILIO_ADMIN_NUMBER}`
            })
        } catch(err){
            Logger.error(`An error has occurred when sending a Whatsapp message`)
        }
    }
}

export default new MessageService()