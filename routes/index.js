#!/usr/bin/env node
'use strict';
const boom = require('boom');
const Joi = require('joi');

const mocks = require('../config/mock_particle_cloud');
let mockDeviceList = mocks.attributes.mockDeviceList,
	mockDevices = mocks.attributes.mockDevices,
	hardcodedOAuthToken = mocks.attributes.mockOAuthTokens;

const secureEPHeaders = {
	"host" : Joi.any(),
	"accept" : Joi.any(),
	"accept-encoding" : Joi.any(),
	"user-agent" : Joi.any(),
	"connection" : Joi.any(),
	"content-type" : Joi.any(),
	"content-length" : Joi.any(),
	"authorization" : Joi.string().min(3).max(128).regex(new RegExp('.*Bearer ' + hardcodedOAuthToken.access_token)).required()
};

const secureEPConfig = {
	validate : {
		headers : secureEPHeaders,
		failAction : (request, reply, source, error) => {
			error.output.payload.message = 'missing auth param';
			return reply(boom.badData(error));
		}
	}
};

let staticRoutes = [
	{
		method : 'GET',
		path : '/device/{id}',
		config : secureEPConfig,
		handler : (request, reply) => {
			// return 404 is device not found
			for (let i = 0; i < mockDeviceList.length; i++) {
				let mockDev = mockDeviceList[i];
				if (mockDev.id == request.params.id) {
					return reply('Hello, ' + request.params.id + '!');
				}
			}
			return reply(boom.notFound('device not found', request.params.id));
		}
	},
	{
		method : [ 'POST', 'GET' ],
		path : '/oauth/token',
		handler : (request, reply) => {
			let rep = boom.expectationFailed({});
			let parms = request.query;
			if (request.route.method == 'post') {
				parms = request.payload;
			}
			if (parms.username == 'user'
				&& parms.password == 'password') {
				rep = hardcodedOAuthToken;
			}
			return reply(rep);
		}
	}, {
		method : 'DELETE',
		path : '/v1/access_tokens/{token}',
		config : secureEPConfig,
		handler : (request, reply) => {
			reply({
				"ok" : true
			});
		}
	}, {
		method : 'GET',
		path : '/v1/devices',
		config : secureEPConfig,
		handler : (request, reply) => {
			return reply(mockDeviceList);
		}
	}, {
		method : 'GET',
		path : '/v1/devices/{deviceId}',
		config : secureEPConfig,
		handler : (request, reply) => {
			for (let i = 0; i < mockDevices.length; i++) {
				if (mockDevices[i].id == request.params.deviceId) {
					return reply(mockDevices[i]);
				}
			}
			return reply(boom.notFound('device not found', request.params.deviceId));
		}
	} ];

let dynamicRoutes = [];
mockDevices.forEach((device) => {
	let newRoute = null;
	// add routes for device variables
	for (let deviceVar in device.variables) {
		if (device.variables.hasOwnProperty(deviceVar)) {
			newRoute = {
				method : 'GET',
				path : '/v1/devices/' + device.id + '/' + deviceVar,
				config : secureEPConfig,
				handler : (request, reply) => {
					let rep = {
						"name" : device.variables[deviceVar],
						"result" : "emulator v1_device_variables route",
						"coreInfo" : {
							"name" : device.name,
							"deviceID" : device.id,
							"connected" : device.connected,
							"last_handshake_at" : device.last_heard,
							"last_app" : ""
						}
					};
					if (device.variables[deviceVar] == 'int32') {
						// TODO map vals or hardcode them to make sense
						rep.result = 77; // nonsense val
					}
					return reply(rep);
				}
			};
			dynamicRoutes.push(newRoute);
		}
	}
	// add routes for device functions
	for (let df in device.functions) {
		if (device.functions.hasOwnProperty(df)) {
			let deviceFunc = device.functions[df];
			newRoute = {
				method : 'POST',
				path : '/v1/devices/' + device.id + '/' + deviceFunc,
				config : secureEPConfig,
				handler : (request, reply) => {
					let rep = {
						"id" : device.id,
						"name" : deviceFunc,
						"last_app" : "",
						"connected" : device.connected,
						"return_value" : 1
					};
					return reply(rep);
				}
			};
			dynamicRoutes.push(newRoute);
		}
	}
});

// aggregate routes
let moduleExports = [];
dynamicRoutes.forEach((route) => {
	moduleExports.push(route);
});
staticRoutes.forEach((route) => {
	moduleExports.push(route);
});
module.exports = moduleExports;