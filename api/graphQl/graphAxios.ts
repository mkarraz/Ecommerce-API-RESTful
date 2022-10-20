import axios from "axios"

const graphqlMutation = {
    operationName: "createProduct",
    query: `mutation createProduct {
      createProduct(data: { 
                      name: "graphProduct",
                      price: 50,
                      description: "graphProduct",
                      photoURL: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
                      stock: 50 }) {
                          id
                          name
                          price
                          description
                          photoURL
                          stock
                      }
      }`,
}

const graphqlQuery = {
    operationName: "queryGraphProduct",
    query: `query queryGraphProduct{
      getProduct(id: "63508af4395bf7ef68cebb39") {
            id
            name
            price
            description
            photoURL
            stock
        }
    }`,
}

const options = {
    url: "http://localhost:8081/graphql",
    method: "POST",
    data: graphqlMutation,
  };
  
  const response = axios(options);
  
  console.log(response);