class UserDTO {

    #id: string
    #email: String
    #password: String
    #name: String
    #address: String
    #age: Number
    #phoneNumber: String
    #picture: String
    #isAdmin: String

    constructor(user: any) {

        this.#id = user._id
        this.#email = user.email
        this.#password = user.password
        this.#name = user.name
        this.#address = user.address
        this.#age = user.age
        this.#phoneNumber = user.phoneNumber
        this.#picture = user.picture
        this.#isAdmin = user.isAdmin

    }

    chatUser() {
        const userDisplayed = {
            id: this.#id,
            email: this.#email,
            isAdmin: this.#isAdmin
        }
        return userDisplayed
    }

    toJson() {
        const userDisplayed = {
            id: this.#id,
            email: this.#email,
            password: this.#password,
            name: this.#name,
            address: this.#address,
            age: this.#age,
            number: this.#phoneNumber,
            picture: this.#picture,
            isAdmin: this.#isAdmin
        }
        return userDisplayed
    }
}

export default UserDTO