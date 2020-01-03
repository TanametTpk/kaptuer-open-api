# What is this?

This is libs that help you create API server with node.js and express.js faster.

# Installation

`npm i --save kaptuer-open-api`

then import

```
const kaptuer = require('kaptuer-open-api')

let routes = {
    xs:{
        get: {
            path: "/",
            method: "get",
            middlewares: [],
            controller: "xs",
            action: "get"
        }
    }
}

let services = {
    xs:{
        get: async (req) => {

            return ["hello world"];
            
        }
    }
}

kaptuer.start({
    routes,
    services,
    port: <your port>
})

```