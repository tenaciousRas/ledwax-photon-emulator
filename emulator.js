'use strict';

const Hapi = require('hapi');

var PORT = process.env.LEDWAX_EMU_PORT || 3000;
const server = new Hapi.Server();
server.connection({ port: PORT });

const serverRoutes = require('./config/routes');

serverRoutes.push({
	method : 'GET',
	path : '/',
	handler : function(request, reply) {
		reply({
			"emulator_running" : true
		});
	}
});
server.route(serverRoutes);

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('LEDWax Emulator Server Running at:', server.info.uri);
});
