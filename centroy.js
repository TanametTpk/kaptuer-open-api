const getAll = require('require-all')

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
    {
        name: "models",
        path: "./models"
    },
    {
        name: "configs",
        path: "./configs"
    },
    {
        name: "services",
        path: "./services"
    }
]

let userModules = [
    {
        name: "models",
        path: __dirname + "/models"
    },
    {
        name: "configs",
        path: __dirname + "/config"
    },
    {
        name: "services",
        path: __dirname + "/services"
    }
]

defaultModules.map((defaultModule) => {

    state = getAndSetModules(state, defaultModule.name, defaultModule.path)

})

userModules.map((userModule) => {

    state = getAndSetModules(state, userModule.name, userModule.path)

})

module.exports = state