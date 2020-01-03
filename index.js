const runServer = require('./server')
const centroy = require('./centroy')

const start = ({routes, services, port}) => {

    // for new setup in future
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

    centroy.addModule({routes, services})

    runServer(port, routes, services)

}

module.exports = {
    start
}