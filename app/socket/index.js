module.exports = function(server){

    const centroy = require( "../../centroy" ).state
    const routesConfig = centroy.routes
    const services = centroy.services
    const configs = centroy.configs.env.socket
    const middlewares = centroy.configs.socket.middlewares

    const io = require('socket.io')(server, configs);
    
    const boardcast = (socket, type, event_name, data, receivers) => {

        // * socket is req *

        if (type === "boardcast"){
            socket.broadcast.emit(event_name, data);
        }

        if (type === "personal"){

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

                let { event_name, boardcast } = route.socket
                if (!boardcast) boardcast = {type:"", event_name:"none"}

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

            try {

                // socket = req
                socket.body = data

                // response
                let response = await method(socket)
                if (callback) callback(response)

                // boardcast
                boardcast(socket, boardcast_type, boardcast_event_name, response, socket._receivers)

                // custom boardcast
                if (socket._boardcasts){
                    socket._boardcasts.map((_boardcast) => {
                        boardcast(socket, _boardcast.type, _boardcast.event_name, _boardcast.data, _boardcast.receivers)
                    })
                }


            } catch (err) {
                if (callback) callback({error:err.message})
            }

        });

    }

    const setupMiddlewares = (io, socket) => {

        // socket have global middlewares only, except use namespace you can make sub middlewares
        Object.values(middlewares).map((middleware) => {

            io.use(middleware)

        })

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
                if (callback) callback({success:true})
            } catch (err) {
                if (callback) callback({error:err.message})
            }
    
        })
    
        socket.on('leave' , (data, callback) => {
    
            try{
                socket.leave(data.room)
                if (callback) callback({success:true})
            }catch(err){
                if (callback) callback({error:err.message})
            }
    
        })
    }

	// connected
	io.on('connection' , function(socket){
        
        // setup middlewares
        setupMiddlewares(io, socket)

        // setup controller
        setupDefaultController(socket)
		setupController(socket)

		socket.on('disconnect' , function(){
			// disconnected
		})

	})

	return io

}