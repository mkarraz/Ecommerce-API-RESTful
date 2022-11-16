import nodemailer from 'nodemailer'
import config from '../config';
import Logger from '../utils/logger'

const gmailtransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.GMAIL_MAIL,
        pass: config.GMAIL_PROVISIONAL_PASS
    }
});

class MailSender{

    transporter: nodemailer.Transporter    
    
    constructor(){
        this.transporter = gmailtransporter
    }
    async newRegister(user: any){
        try{ 
            await this.transporter.sendMail({
                from: 'E-commerce MK',
                to: config.GMAIL_MAIL,
                subject: `New registered user`,
                html: ` 
                        <h1>A new user has been registered!</h1>
                        <br>
                        <p>Name: ${user.name}</p> 
                        <p>eMail: ${user.email}</p>
                        <p>Address: ${user.address}</p>   
                        <p>Age: ${user.age}</p>
                        <p>Phone Number: ${user.phoneNumber}</p>`,
            })
        }catch(err){
            Logger.error(`An error has occurred when sending the user registration email: ${user.email}`)
        }
    }

    async newOrder(user: any, products: any) {
        try {
            await this.transporter.sendMail({
                from: 'E-commerce MK',
                to: config.GMAIL_MAIL,
                subject: `New order from ${user.name}`,
                html: `
                    <h5> User: </h5>
                        <p>${user.name}</p> 
                        <p>${user.email}</p> 
                        <p>${user.phoneNumber}</p>
                        </hr>
            
                        <h2> Pedido </h2>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Thumbnail</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${products.map((product: any) =>
                                `<tr>
                                    <td>${product.name}</td>
                                    <td>${product.price}</td>
                                    <td>${product.quantity}</td>
                                    <td>${product.description}</td>
                                    <td><img style="max-width: 40px" src="${product.photoURL}"></img></td>
                                </tr>`)}
                            </tbody>
                        </table>
                        `
            })
        } catch (err) {
            Logger.error(`An error has occurred when sending the user NewOrder email: ${user.email}`)
        }
    }

}


export default new MailSender()