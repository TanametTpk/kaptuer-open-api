const runServer = require('./server')
const _setup = require('./setup')
const centroy = require('./centroy')

const setupCentroy = ({routes, services, middlewares, errors, port}) => {

    // for new setup in future
    _setup.init()
    centroy.addModule({routes, services})
    centroy.addModule({configs:{ middlewares, errors:{handlers:errors} }})

}

const setup = ({routes, services, middlewares, errors, port}) => {

    // for new setup in future
    setupCentroy({routes, services, middlewares, errors, port})
    return runServer(port, routes, services)

}

module.exports = {
    setup
}