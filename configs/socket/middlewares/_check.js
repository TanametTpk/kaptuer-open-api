
module.exports = (socket, next) => {

    if (socket.handshake.query._check_middleware) console.log("check socket complete!");
    
    next()

}