const runServer = require('./server')
const setup = require('./setup')
const centroy = require('./centroy')

const start = ({routes, services, middlewares, errors, port}) => {

    // for new setup in future
    setup.init()
    centroy.addModule({routes, services})
    centroy.addModule({configs:{ middlewares, errors:{handlers:errors} }})

    runServer(port, routes, services)

}

module.exports = {
    start
}