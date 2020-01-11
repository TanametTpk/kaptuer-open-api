const _setup = require('./setup')
const centroy = require('./centroy')

const setupCentroy = ({routes, services, middlewares, errors}) => {

    // for new setup in future
    _setup.init()
    centroy.addModule({routes, services})
    centroy.addModule({configs:{ middlewares, errors:{handlers:errors} }})

}

const use = ({routes, services, middlewares, errors}) => {
    
    setupCentroy({routes, services, middlewares, errors})

}

const setup = ({routes, services, middlewares, errors, port}) => {

    const runServer = require('./server')
    
    // for new setup in future
    setupCentroy({routes, services, middlewares, errors})
    return runServer(port)

}

const clear = () => {
    centroy.clear()
}

module.exports = {
    setup,
    clear,
    use
}