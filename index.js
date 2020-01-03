const runServer = require('./server')
const setup = require('./setup')

const start = ({routes, services, port}) => {

    // for new setup in future
    setup.init()
    centroy.addModule({routes, services})

    runServer(port, routes, services)

}

module.exports = {
    start
}