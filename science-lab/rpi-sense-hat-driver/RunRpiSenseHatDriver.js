"use strict";

var fluid = require("infusion");

require("infusion-nexus-client");
require("./RpiSenseHatDriver.js");

var program = require("commander");

var nexusHost = "localhost";
var nexusPort = 9081;
var senseHatNumber = 1;

program
    .option("-h, --host <hostname>", "Nexus hostname")
    .option("-p, --port <port>", "Nexus port number", parseInt)
    .option("-n, --number <integer>", "SenseHAT number", parseInt)
    .parse(process.argv);

if (program.host) {
    nexusHost = program.host;
}

if (program.port) {
    nexusPort = program.port;
}

if (program.number) {
    senseHatNumber = program.number;
}

var sensorNames = [];
sensorNames[1] = "Temperature A";
sensorNames[2] = "Temperature B";

fluid.nexus.rpiSenseHatDriver.logErrorAndExit = function (error) {
    console.log(error.message);
    process.exit(1);
};

var driver = fluid.nexus.rpiSenseHatDriver({
    nexusHost: nexusHost,
    nexusPort: nexusPort,
    nexusPeerComponentPath: "rpiSenseHatTemp" + senseHatNumber,
    nexusPeerComponentOptions: {
        type: "fluid.nexus.rpiSenseHatDriver.tempSensor" + senseHatNumber
    },
    sensorName: sensorNames[senseHatNumber],
    listeners: {
        "onErrorConstructingPeer.exitProcess": {
            funcName: "fluid.nexus.rpiSenseHatDriver.logErrorAndExit",
            args: ["{arguments}.0"]
        },
        "onNexusPeerComponentDestroyed.exitProcess": {
            func: function () { process.exit(); }
        }
    }
});

process.on("SIGINT", function () {
    driver.destroyNexusPeerComponent();
});

process.on("SIGTERM", function () {
    driver.destroyNexusPeerComponent();
});
