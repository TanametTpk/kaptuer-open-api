module.exports = (port) => {

    var express = require('./configs/express');
    var items = express();
    const server = items.server;

    const start = () => {
        server.listen(port , function() {
            console.log(`server run at http://localhost:${port}`);
        })
    }

    const getServer = () => {
        return server
    }

    return {
        start,
        getServer
    }

}