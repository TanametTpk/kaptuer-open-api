module.exports = function(server){

    const centroy = require( "../../centroy" ).state
    const routesConfig = centroy.routes
    const services = centroy.services

    const io = require('socket.io')(server);
    
    const boardcast = (socket, type, event_name, data) => {

        // * socket is req *

        if (type === "boardcast"){
            socket.broadcast.emit(event_name, data);
        }

        if (type === "personal"){

            receivers = socket._receivers

            if (receivers) receivers.map((receiver) => {
                socket.to(receiver).emit(event_name, data)
            })

        }

    }

    const createMainController = (routeConfig, socket) => {

        const routes = Object.values(routeConfig)
        routes.map((route) => {

            const service = services[route.controller][route.action]

            if (route.socket) {

                const { event_name, boardcast } = route.socket
                createController(
                    socket,
                    event_name,
                    service,
                    boardcast.type,
                    boardcast.event_name
                )

            }

        })

    }

    const createController = (socket, event_name, method, boardcast_type, boardcast_event_name) => {

        socket.on(event_name, async(data, callback) => {

            // socket = req
            socket.body = data

            // response
            let response = await method(socket)
            callback(response)

            // boardcast
            boardcast(socket, boardcast_type, boardcast_event_name, response)

        });

    }

    const setupController = (socket) => {

        const routesKey = Object.keys(routesConfig)
        routesKey.map((controllerName) => {
            
            let routeConf = routesConfig[controllerName]
            createMainController(routeConf, socket)

        })

    }

    const setupDefaultController = (socket) => {
        socket.on('join' , (data, callback) => {

            try{
                socket.join(data.room)
                callback({success:true})
            } catch (err) {
                console.log(err);
            }
    
        })
    
        socket.on('leave' , (data, callback) => {
    
            try{
                socket.leave(data.room)
                callback({success:true})
            }catch(err){
                console.log(err);
            }
    
        })
    }

	// connected
	io.on('connection' , function(socket){
        
        // setup controller
        setupDefaultController(socket)
		setupController(socket)

		socket.on('disconnect' , function(){
			// disconnected
		})

	})

	return io

}