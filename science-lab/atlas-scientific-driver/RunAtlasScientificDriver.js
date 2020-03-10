"use strict";

var fluid = require("infusion");

require("infusion-nexus-client");
require("./AtlasScientificDriver.js");

var program = require("commander");

var devicePath = "/dev/ttyUSB0";
var nexusHost = "localhost";
var nexusPort = 9081;

program
    .option("-d, --device <device>")
    .parse(process.argv);

if (program.device) {
    devicePath = program.device;
}

fluid.nexus.atlasScientificDriver.logErrorAndExit = function (error) {
    console.log(error.message);
    process.exit();
};

var driver = fluid.nexus.atlasScientificDriver({
    devicePath: devicePath,
    nexusHost: nexusHost,
    nexusPort: nexusPort,
    listeners: {
        "onErrorConnectingToSensor.exitProcess": {
            funcName: "fluid.nexus.atlasScientificDriver.logErrorAndExit",
            args: ["{arguments}.0"]
        },
        "onErrorConstructingPeer.exitProcess": {
            funcName: "fluid.nexus.atlasScientificDriver.logErrorAndExit",
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

driver.start();
