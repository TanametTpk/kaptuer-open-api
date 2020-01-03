const centroy = require('./centroy')

const init = () => {

    let state = {}
    let defaultModules = [
        {
            name: "configs",
            path: __dirname + "/configs"
        }
    ]

    defaultModules.map((defaultModule) => {

        centroy.readModulesFromFiles(defaultModule.name, defaultModule.path)

    })
    
}

module.exports = {
    init
}