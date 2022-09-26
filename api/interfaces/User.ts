export interface User {
    password: string
    email: string
    name: string
    address: string
    age: number
    phoneNumber: string
    picture: string
    comparePassword(reqPassword: string, password: string): Promise<boolean>
}