const express = require("express")
const http = require("http")
const cors = require('../libs/_cors')
// const database = require( "./database" )()

module.exports = function(){

	const centroy = require('../centroy').state
	const middlewares = centroy.configs.middlewares
	const useMiddleware = centroy.configs.global.middlewares
	const errorHandlers = centroy.configs.errors.handlers
	const useError = centroy.configs.global.errors
	const allowCors = centroy.configs.options.cors
	const origins = centroy.configs.env.origins

	var app = express()
	const server = http.createServer(app);

	// app.set("database" , database)
	
	if (allowCors.allow) app.use(cors([...origins, ...allowCors.origins]))

	app.use(express.json())
	app.use(express.urlencoded({extended: true}))

	// add middlewares
	useMiddleware.map((middleware) => app.use(middlewares[middleware]))
	app.use(require( "../app/http" )())
	useError.map((error) => app.use(errorHandlers[error]))

	const socket = require('../app/socket')(server)

	return {
		app,
		server,
		socket,
	};
}
