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

kaptuer.setup({
    routes,
    services,
    port: <your port>
}).start()

```

# CORS

you can allow cors by env like
```
ALLOW_ORIGIN=http://localhost
```
or multiple origins

```
ALLOW_ORIGIN=<domain1>
ALLOW_ORIGIN0=<domain2>
ALLOW_ORIGIN1=<domain3>
ALLOW_ORIGIN2=<domain4>
ALLOW_ORIGIN3=<domain5>
```

