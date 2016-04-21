var mockDeviceList = [ {
	"id" : "330021000a47343432313031",
	"name" : "ledwax_1",
	"last_app" : null,
	"last_ip_address" : "10.0.0.1",
	"last_heard" : null,
	"product_id" : 0,
	"connected" : false
}, {
	"id" : "360043000a47343432313031",
	"name" : "ledwax_2",
	"last_app" : null,
	"last_ip_address" : "10.0.0.1",
	"last_heard" : "2015-12-15T20:12:51.984Z",
	"product_id" : 6,
	"connected" : true
}, {
	"id" : "0123456789abcdef01234567",
	"name" : "gong_1",
	"last_app" : null,
	"last_ip_address" : "10.0.0.10",
	"last_heard" : "2015-12-15T20:12:51.984Z",
	"product_id" : 0,
	"connected" : true
} ];

var mockDevices = [ {
	"id" : "330021000a47343432313031",
	"name" : null,
	"connected" : true,
	"variables" : null,
	"functions" : null
}, {
	"id" : "360043000a47343432313031",
	"name" : null,
	"connected" : true,
	"variables" : {
		"numStrips" : "int32",
		"stripIndex" : "int32",
		"stripType" : "int32",
		"dispMode" : "int32",
		"modeColor" : "string",
		"modeColorIdx" : "int32",
		"brightness" : "int32",
		"fadeMode" : "int32",
		"fadeTime" : "int32",
		"colorTime" : "int32"
	},
	"functions" : [ "setLEDParams", "resetAll" ]
}, {
	"id" : "0123456789abcdef01234567",
	"name" : "gong_1",
	"connected" : true,
	"variables" : {
		"Gongs" : "int32"
	},
	"functions" : [ "gong", "goto" ],
	"cc3000_patch_version" : "1.29",
	"product_id" : 0,
	"last_heard" : "2015-07-17T22:28:40.907Z"
} ];

var staticRoutes = [
		{
			method : 'GET',
			path : '/device/{id}',
			handler : function(request, reply) {
				reply('Hello, ' + request.params.id + '!');
			}
		},
		{
			method : 'POST',
			path : '/oauth/token',
			handler : function(request, reply) {
				var rep = {
					"ok" : false
				};
				if (request.params.username == 'user'
						&& request.params.password == 'password') {
					rep = {
						"access_token" : "254406f79c1999af65a7df4388971354f85cfee9",
						"token_type" : "bearer",
						"expires_in" : 7776000,
						"refresh_token" : "b5b901e8760164e134199bc2c3dd1d228acf2d90"
					};
				}
				reply(rep);
			}
		}, {
			method : 'DELETE',
			path : '/v1/access_tokens/{token}',
			handler : function(request, reply) {
				reply({
					"ok" : true
				});
			}
		}, {
			method : 'GET',
			path : '/v1/devices',
			handler : function(request, reply) {
				reply(mockDeviceList);
			}
		}, {
			method : 'GET',
			path : '/v1/devices/{deviceId}',
			handler : function(request, reply) {
				var rep = {
					"ok" : false
				};
				for (mockDev in mockDeviceList) {
					if (mockDev.id == request.params.deviceId) {
						rep = mockDev;
					}
				}
				reply(rep);
			}
		} ];

var dynamicRoutes = [];
mockDevices.forEach(function(device) {
	var newRoute = null;
	// add routes for device variables
	for ( var deviceVar in device.variables) {
		if (device.variables.hasOwnProperty(deviceVar)) {
			newRoute = {
				method : 'GET',
				path : '/v1/devices/' + device.id + '/' + deviceVar,
				handler : function(request, reply) {
					var rep = {
						"name" : device.variables[deviceVar],
						"result" : "foo",
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
		// add routes for device variables
		for ( var deviceFunc in device.functions) {
			if (device.variables.hasOwnProperty(deviceFunc)) {
				newRoute = {
					method : 'POST',
					path : '/v1/devices/' + device.id + '/' + deviceVar,
					handler : function(request, reply) {
						var rep = {
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
var moduleExports = [];
dynamicRoutes.forEach(function(route) {
	moduleExports.push(route);
});
staticRoutes.forEach(function(route) {
	moduleExports.push(route);
});
module.exports = moduleExports;
