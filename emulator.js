#!/usr/bin/env node
'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Hoek = require('hoek');
const Tv = require('tv');	// web-based console logging at [baseurl]/debug/console
const Inert = require('inert');
const Boom = require('boom');
const Vision = require('vision');

var PORT = process.env.LEDWAX_EMU_PORT || 3001;
const server = new Hapi.Server({debug: {
	log: ['error', 'debug', 'warn', 'info'],
	request: ['error', 'debug', 'warn', 'info']
}});
server.connection({ port: PORT });

const serverRoutes = require('./routes');

serverRoutes.push({
	method : 'GET',
	path : '/heartbeat',
	handler : function(request, reply) {
		reply({
			"emulator_running" : true
		});
	}
});
server.route(serverRoutes);

server.register(Vision, (err) => {
    Hoek.assert(!err, err);
    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });
		// server.register(Boom, (err) => {
    // 	Hoek.assert(!err, err);
			server.register(Inert, (err) => {
	    	Hoek.assert(!err, err);
				server.register(Tv, (err) => {
		    	Hoek.assert(!err, err);
					server.start((err) => {
					    if (err) {
					        throw err;
					    }
					    console.log('LEDWax Emulator Server Running at:', server.info.uri);
					});
				});
			});
		// });
});
