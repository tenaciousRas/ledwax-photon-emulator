#!/usr/bin/env node
'use strict';

const mockOAuthTokens = {
	"access_token" : "254406f79c1999af65a7df4388971354f85cfee9",
	"token_type" : "bearer",
	"expires_in" : 7776000,
	"refresh_token" : "b5b901e8760164e134199bc2c3dd1d228acf2d90"
};

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
	"id" : "460043000a47343432319876",
	"name" : "ledwax_3",
	"last_app" : null,
	"last_ip_address" : "10.0.0.2",
	"last_heard" : "2015-2-16T21:13:42.643Z",
	"product_id" : 2,
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
	"name" : "ledwax_1",
	"connected" : true,
	"variables" : null,
	"functions" : null
}, {
	"id" : "360043000a47343432313031",
	"name" : "ledwax_2",
	"connected" : true,
	"variables" : {
		"numStrips" : "int32",
		"stripIndex" : "int32",
		"stripType" : "int32",
		"numPixels" : "int32",
		"numPixColors" : "int32",
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
	"id" : "460043000a47343432319876",
	"name" : "ledwax_3",
	"connected" : true,
	"variables" : {
		"numStrips" : "int32",
		"stripIndex" : "int32",
		"stripType" : "int32",
		"numPixels" : "int32",
		"numPixColors" : "int32",
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

const mockDeviceVariableValues = {
	"360043000a47343432313031" : [
		{
			"numStrips" : "3",
			"stripType" : "11",
			"numPixels" : "60",
			"numPixColors" : "1",
			"dispMode" : "0",
			"modeColor" : "[fa3452]",
			"modeColorIdx" : "0",
			"brightness" : "255",
			"fadeMode" : "0",
			"fadeTime" : "5000",
			"colorTime" : "5000"
		},
		{
			"numStrips" : "3",
			"stripType" : "1",
			"numPixels" : "60",
			"numPixColors" : "3",
			"dispMode" : "1",
			"modeColor" : "[fa3452]",
			"modeColorIdx" : "0",
			"brightness" : "254",
			"fadeMode" : "0",
			"fadeTime" : "5000",
			"colorTime" : "5000"
		},
		{
			"numStrips" : "3",
			"stripType" : "2",
			"numPixels" : "30",
			"numPixColors" : "3",
			"dispMode" : "2",
			"modeColor" : "[fa3452]",
			"modeColorIdx" : "0",
			"brightness" : "253",
			"fadeMode" : "0",
			"fadeTime" : "5000",
			"colorTime" : "5000"
		}
	],
	"460043000a47343432319876" : [
		{
			"numStrips" : "3",
			"stripType" : "11",
			"numPixels" : "60",
			"numPixColors" : "3",
			"dispMode" : "0",
			"modeColor" : "[fa3452]",
			"modeColorIdx" : "0",
			"brightness" : "255",
			"fadeMode" : "0",
			"fadeTime" : "5000",
			"colorTime" : "5000"
		},
		{
			"numStrips" : "3",
			"stripType" : "11",
			"numPixels" : "60",
			"numPixColors" : "1",
			"dispMode" : "1",
			"modeColor" : "[fa3452]",
			"modeColorIdx" : "0",
			"brightness" : "254",
			"fadeMode" : "0",
			"fadeTime" : "5000",
			"colorTime" : "5000"
		},
		{
			"numStrips" : "3",
			"stripType" : "2",
			"numPixels" : "60",
			"numPixColors" : "3",
			"dispMode" : "2",
			"modeColor" : "[fa3452]",
			"modeColorIdx" : "0",
			"brightness" : "253",
			"fadeMode" : "0",
			"fadeTime" : "5000",
			"colorTime" : "5000"
		}
	]
};

module.exports.attributes = {
	mockOAuthTokens : mockOAuthTokens,
	mockDeviceList : mockDeviceList,
	mockDevices : mockDevices,
	mockDeviceVarVals : mockDeviceVariableValues
};