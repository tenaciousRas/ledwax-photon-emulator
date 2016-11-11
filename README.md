# LEDWax Photon Emulator

A simple emulator of a Particle IoT cloud server with LEDWax Photon devices attached.  The emulator provides a mock authentication endpoint and mock device endpoints.  The device endpoints cover all devices and each device variable and function.

## Getting Started
This is a NodeJS project.  To run the emulator you need the following:
- git
- npm
- NodeJS

Once you have these requirements you can run the emulator with these unix commands:

### Run the Emulator

```bash
git clone https://github.com/tenaciousRas/ledwax-photon-emulator
cd ledwax-photon-emulator
npm start
```

Upon successful start you will see a message like:
```bash
161901/130853.039, [log,info,emulator], data: LEDWax Emulator Server Running at: http://lsoft-linux-mint-17-3:3001
```

## Usage
To verify the server is running open a browser to the following location:
http://localhost:3001

You should see this:
{"emulator_running":true}

NOTE:  If you open a browser from the Vagrant VM host used by the LEDWax-WebUI master repository then port 3001 is mapped to port 3002.

Accessing other endpoints of the emulator requires a mix of GET, POST, and other REST commands, like a Particle Cloud REST API.  Emulator routes are defined in `routes\index.js`.

### Configure Server Port
The default server port is 3001.  This can be modified with the LEDWAX_EMU_PORT environment variable.  The following unix commands modify this value:
```bash
export LEDWAX_EMU_PORT=4500
```

To revert to the default port unset the environment variable.
For example:
```bash
unset LEDWAX_EMU_PORT
```

## Modifying Endpoint Responses
If you want to modify the responses to variable and function calls you must currently change the NodeJS code.  This is done in config/routes/index.js.
