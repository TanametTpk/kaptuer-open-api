const runServer = require('./server')

const start = ({port}) => {

    // for new setup in future

    runServer(port)

}

module.exports = {
    start
}