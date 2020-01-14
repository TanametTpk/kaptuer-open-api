const _setup = require('./setup')
const centroy = require('./centroy')

const setupCentroy = ({routes, services, middlewares, errors, globals}) => {

    // for new setup in future
    _setup.init()
    centroy.addGlobal(globals)
    centroy.addModule({routes, services})
    centroy.addModule({configs:{ middlewares, errors:{handlers:errors} }})
    
}

const use = ({routes, services, middlewares, errors, globals}) => {
    
    setupCentroy({routes, services, middlewares, errors, globals})

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