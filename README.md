# LEDWax Photon Emulator

A simple emulator of a Particle IoT cloud server with LEDWax Photon devices attached.  The emulator provides a mock authentication endpoint and mock device endpoints.  The device endpoints cover all devices and each device variable and function.

## Getting Started
This is a NodeJS project.  To run the emulator you need the following:
- clone this project
- npm
- NodeJS

Once you have these requirements you can run the emulator with these unix commands:
- cd ledwax-photon-emulator
- node emulator.js

## Usage
To verify the server is running open a browser to the following location:
http://localhost:3000

You should see this:
{"emulator_running":true}

### Server Port
The default server port is 3000.  This can be modified with the LEDWAX_EMU_PORT environment variable.  The following unix commands modify this value:
export LEDWAX_EMU_PORT=4500

To revert to the default port unset the environment variable.
For example:
unset LEDWAX_EMU_PORT

## Modifying Endpoint Responses
If you want to modify the responses to variable and function calls you must currently change the NodeJS code.  This is done in config/routes/index.js.
