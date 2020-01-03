const getAll = require('require-all')
const fs = require('fs')
const path = require('path')
const appRoot = require('app-root-path');

const getAndSetModules = ( state , name, path) => {

    let jsx = getAll({
        dirname: path,
    })

    // if state already have then merge
    if (state[name]){
        state = {
            ...state,
            [name]: {
                ...state[name],
                ...jsx
            }
        }
    }

    // if new attribute then assign new one
    else {
        state = {
            ...state,
            [name]: jsx
        }
    }

    return state

}

let state = {}
let defaultModules = [
    // {
    //     name: "models",
    //     path: "./models"
    // },
    {
        name: "configs",
        path: __dirname + "/configs"
    },
    // {
    //     name: "services",
    //     path: __dirname + "/services"
    // }
]

let userModules = [
    // {
    //     name: "models",
    //     path: __dirname + "/models"
    // },
    {
        name: "configs",
        path: path.join(appRoot + "/configs")
    },
    {
        name: "services",
        path: path.join(appRoot + "/services")
    }
]

defaultModules.map((defaultModule) => {

    state = getAndSetModules(state, defaultModule.name, defaultModule.path)

})

try {

    userModules.map((userModule) => {

        if (!fs.existsSync(userModule.path)) {
            throw new Error(`need path ${userModule.path}`)
        }

        state = getAndSetModules(state, userModule.name, userModule.path)
    
    })

} catch (error) {
    throw new Error(`import modules error -> ${error.message}`)
}

module.exports = state