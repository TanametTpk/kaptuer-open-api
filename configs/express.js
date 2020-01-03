const express = require("express")
const http = require("http")
// const database = require( "./database" )()

module.exports = function(){

	const centroy = require('../centroy').state
	const middlewares = centroy.configs.middlewares
	const useMiddleware = centroy.configs.global.middlewares
	const errorHandlers = centroy.configs.errors.handlers
	const useError = centroy.configs.global.errors

	var app = express()
	const server = http.createServer(app);

	// app.set("database" , database)

	app.use(express.json())

	// add middlewares
	useMiddleware.map((middleware) => app.use(middlewares[middleware]))
	
	app.use(require( "../app/http" ))
	useError.map((error) => app.use(errorHandlers[error]))

	// const io = require('../app/socket')(server)

	return {
		app,
		server,
		// io,
	};
}
