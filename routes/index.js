#!/usr/bin/env node
'use strict';
const boom = require('boom');
const Joi = require('joi');

const mocks = require('../config/mock_particle_cloud');
let mockDeviceList = mocks.attributes.mockDeviceList,
	mockDevices = mocks.attributes.mockDevices;
const hardcodedOAuthToken = {
		"access_token" : "254406f79c1999af65a7df4388971354f85cfee9",
		"token_type" : "bearer",
		"expires_in" : 7776000,
		"refresh_token" : "b5b901e8760164e134199bc2c3dd1d228acf2d90"
	};

let staticRoutes = [
		{
			method : 'GET',
			path : '/device/{id}',
			handler : (request, reply) => {
				reply('Hello, ' + request.params.id + '!');
			}
		},
		{
			method : ['POST', 'GET'],
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
				reply(rep);
			}
		}, {
			method : 'DELETE',
			path : '/v1/access_tokens/{token}',
			handler : (request, reply) => {
				reply({
					"ok" : true
				});
			}
		}, {
			method : 'GET',
			path : '/v1/devices',
			handler : (request, reply) => {
				reply(mockDeviceList);
			}
		}, {
			method : 'GET',
			path : '/v1/devices/{deviceId}',
			handler : (request, reply) => {
				let rep = {
					"ok" : false
				};
				for (let mockDev in mockDeviceList) {
					if (mockDev.id == request.params.deviceId) {
						rep = mockDev;
					}
				}
				reply(rep);
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
				config : {
					validate: {
            params: {
              auth: Joi.string().min(3).max(10).regex(/^(hardcodedOAuthToken.access_token)$/)
            }
					}
        },
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
						rep.result = 46;
					}
					reply(rep);
				}
			};
			dynamicRoutes.push(newRoute);
		}
		// add routes for device functions
		for (let deviceFunc in device.functions) {
			if (device.variables.hasOwnProperty(deviceFunc)) {
				newRoute = {
					method : 'POST',
					path : '/v1/devices/' + device.id + '/' + deviceFunc,
					handler : (request, reply) => {
						let rep = {
							"id" : device.id,
							"name" : deviceFunc,
							"last_app" : "",
							"connected" : device.connected,
							"return_value" : 1
						};
						reply(rep);
					}
				};
				dynamicRoutes.push(newRoute);
			}
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