const runServer = require('./server')

const start = ({port}) => {

    

    runServer(port)

}

module.exports = {
    start
}