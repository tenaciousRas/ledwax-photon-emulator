#!/usr/bin/env node
'use strict';

const mockDeviceList = [ {
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

const mockDevices = [ {
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

module.exports.attributes = {
  mockDeviceList: mockDeviceList,
  mockDevices: mockDevices
};
