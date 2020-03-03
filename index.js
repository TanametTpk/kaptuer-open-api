const _setup = require('./setup')
const centroy = require('./centroy')

const setupCentroy = ({routes, services, middlewares, errors, globals, options}) => {

    // for new setup in future
    _setup.init()
    centroy.addGlobal(globals)
    centroy.addModule({routes, services})
    centroy.addModule({configs:{ middlewares, errors:{handlers:errors}, options }})
    
}

const use = ({routes, services, middlewares, errors, globals, options}) => {
    
    setupCentroy({routes, services, middlewares, errors, globals, options})

}

const setup = ({routes, services, middlewares, errors, port, options}) => {

    const runServer = require('./server')
    
    // for new setup in future
    setupCentroy({routes, services, middlewares, errors, options})
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