module.exports = (port) => {

    var express = require('./config/express');
    var items = express();
    const server = items.server;
    
    server.listen(port , function() {
        console.log(`server run at http://localhost:${port}`);
    })    

}