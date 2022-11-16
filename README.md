## Backend-Coderhouse Final Project

---

JSON postman collection included.


**Start APP local**

A development.env file should be created (Use env.example as example guide)


To start locally:  
`npm start || npm start 8081 CLUSTER`


#### API Routes:

##### PRODUCTs Routes

- **Get all products**

  - `GET` | api/products

- **Filter Products by Category**

  - `GET` | api/products/categories/:category

- **Get product by ID**

  - `GET` | api/products/id/:id

- **Add product**

  - `POST` | api/products

- **Update product by id**

  - `PUT` | api/products/id/:id

- **Delete product by id**
  - `DELETE` | api/products/id/:id

##### CART Routes

- **Get all products from cart by user id**
  - `GET` | api/cart

- **Create new cart**

  - `POST` | api/cart

- **Add product to cart by user id**

  - `POST` | api/cart/addProduct/:productId

- **Delete product to cart by user id**
  - `DELETE` | api/cart/:productId

- **Delete all products to cart by user id**
  - `DELETE` | api/cart

##### Order Routes

- **Create new order**
  - `POST` | api/order

##### Info Routes

- **Get server configuration info**
  - `GET` | api/info

##### Chat Routes

- **Render chat app**
  - `GET` | api/chat

##### SESSION Routes

- **Login**
  - `POST` | api/login

- **Logout**
  - `POST` | api/logout

- **SignUp**
  - `POST` | api/signup

_made with_ :persevere: _by ale_

