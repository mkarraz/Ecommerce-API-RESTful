import m from "../persistence/factory"
const model = m("user")

class UserService {

    model: any

    constructor(model: any){
        this.model = model
    }

    async saveUser(newUser: any){
        const data = await this.model.save(newUser)
        return data
    }
    
}

export default new UserService(model)