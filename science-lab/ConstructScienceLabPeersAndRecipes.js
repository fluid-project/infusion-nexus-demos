"use strict";

var fluid = require("infusion");
var gpii = fluid.registerNamespace("gpii");

require("gpii-nexus-client");

var nexusHost = "localhost";
var nexusPort = 9081;

fluid.promise.sequence([
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.sensorPeer",
            {
                gradeNames: ["gpii.selfDestroyingModel"],
                model: {
                    sensorData: {}
                }
            }
        );
    },
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.fakeSensor",
            {
                gradeNames: ["gpii.nexus.sensorPeer"]
            }
        );
    },
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.atlasScientificDriver.phSensor",
            {
                gradeNames: ["gpii.nexus.sensorPeer"]
            }
        );
    },
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.atlasScientificDriver.ecSensor",
            {
                gradeNames: ["gpii.nexus.sensorPeer"]
            }
        );
    },
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.rpiSenseHatDriver.tempSensor1",
            {
                gradeNames: ["gpii.nexus.sensorPeer"]
            }
        );
    },
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.rpiSenseHatDriver.tempSensor2",
            {
                gradeNames: ["gpii.nexus.sensorPeer"]
            }
        );
    },
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.scienceLab.collector",
            {
                gradeNames: ["fluid.modelComponent"],
                model: {
                    sensors: {}
                }
            }
        );
    },
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.scienceLab.sendFakeSensor",
            {
                gradeNames: ["gpii.nexus.recipeProduct"],
                componentPaths: {
                    fakeSensor: null,
                    collector: null
                },
                components: {
                    fakeSensor: "@expand:fluid.componentForPath({recipeProduct}.options.componentPaths.fakeSensor)",
                    collector: "@expand:fluid.componentForPath({recipeProduct}.options.componentPaths.collector)"
                },
                modelRelay: {
                    source: "{fakeSensor}.model.sensorData",
                    target: "{collector}.model.sensors.fakeSensor",
                    forward: {
                        excludeSource: "init"
                    },
                    singleTransform: {
                        type: "fluid.identity"
                    }
                },
                modelListeners: {
                    "{fakeSensor}.model.sensorData.value": {
                        funcName: "gpii.nexus.recordValueHistory",
                        args: [
                            "{change}.value",
                            "value",
                            "{collector}",
                            "sensors.fakeSensor.history",
                            30
                        ]
                    }
                }
            }
        );
    },
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.scienceLab.sendPhSensor",
            {
                gradeNames: ["gpii.nexus.recipeProduct"],
                componentPaths: {
                    phSensor: null,
                    collector: null
                },
                components: {
                    phSensor: "@expand:fluid.componentForPath({recipeProduct}.options.componentPaths.phSensor)",
                    collector: "@expand:fluid.componentForPath({recipeProduct}.options.componentPaths.collector)"
                },
                modelRelay: {
                    source: "{phSensor}.model.sensorData",
                    target: "{collector}.model.sensors.phSensor",
                    forward: {
                        excludeSource: "init"
                    },
                    singleTransform: {
                        type: "fluid.identity"
                    }
                }
            }
        );
    },
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.scienceLab.sendEcSensor",
            {
                gradeNames: ["gpii.nexus.recipeProduct"],
                componentPaths: {
                    ecSensor: null,
                    collector: null
                },
                components: {
                    ecSensor: "@expand:fluid.componentForPath({recipeProduct}.options.componentPaths.ecSensor)",
                    collector: "@expand:fluid.componentForPath({recipeProduct}.options.componentPaths.collector)"
                },
                modelRelay: {
                    source: "{ecSensor}.model.sensorData",
                    target: "{collector}.model.sensors.ecSensor",
                    forward: {
                        excludeSource: "init"
                    },
                    singleTransform: {
                        type: "fluid.identity"
                    }
                }
            }
        );
    },
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.scienceLab.sendRpiTempSensor1",
            {
                gradeNames: ["gpii.nexus.recipeProduct"],
                componentPaths: {
                    tempSensor: null,
                    collector: null
                },
                components: {
                    tempSensor: "@expand:fluid.componentForPath({recipeProduct}.options.componentPaths.tempSensor)",
                    collector: "@expand:fluid.componentForPath({recipeProduct}.options.componentPaths.collector)"
                },
                modelRelay: {
                    source: "{tempSensor}.model.sensorData",
                    target: "{collector}.model.sensors.rpiTempSensor1",
                    forward: {
                        excludeSource: "init"
                    },
                    singleTransform: {
                        type: "fluid.identity"
                    }
                },
                modelListeners: {
                    "{tempSensor}.model.sensorData.value": {
                        funcName: "gpii.nexus.recordValueHistory",
                        args: [
                            "{change}.value",
                            "value",
                            "{collector}",
                            "sensors.rpiTempSensor1.history",
                            30
                        ]
                    }
                }
            }
        );
    },
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.scienceLab.sendRpiTempSensor2",
            {
                gradeNames: ["gpii.nexus.recipeProduct"],
                componentPaths: {
                    tempSensor: null,
                    collector: null
                },
                components: {
                    tempSensor: "@expand:fluid.componentForPath({recipeProduct}.options.componentPaths.tempSensor)",
                    collector: "@expand:fluid.componentForPath({recipeProduct}.options.componentPaths.collector)"
                },
                modelRelay: {
                    source: "{tempSensor}.model.sensorData",
                    target: "{collector}.model.sensors.rpiTempSensor2",
                    forward: {
                        excludeSource: "init"
                    },
                    singleTransform: {
                        type: "fluid.identity"
                    }
                },
                modelListeners: {
                    "{tempSensor}.model.sensorData.value": {
                        funcName: "gpii.nexus.recordValueHistory",
                        args: [
                            "{change}.value",
                            "value",
                            "{collector}",
                            "sensors.rpiTempSensor2.history",
                            30
                        ]
                    }
                }
            }
        );
    },
    function () {
        return gpii.constructNexusPeer(nexusHost, nexusPort, "scienceLabCollector", {
            type: "gpii.nexus.scienceLab.collector"
        });
    },
    function () {
        return gpii.addNexusRecipe(nexusHost, nexusPort, "sendFakeSensor", {
            reactants: {
                fakeSensor: {
                    match: {
                        type: "gradeMatcher",
                        gradeName: "gpii.nexus.fakeSensor"
                    }
                },
                collector: {
                    match: {
                        type: "gradeMatcher",
                        gradeName: "gpii.nexus.scienceLab.collector"
                    }
                }
            },
            product: {
                path: "sendFakeSensor",
                options: {
                    type: "gpii.nexus.scienceLab.sendFakeSensor"
                }
            }
        });
    },
    function () {
        return gpii.addNexusRecipe(nexusHost, nexusPort, "sendPhSensor", {
            reactants: {
                phSensor: {
                    match: {
                        type: "gradeMatcher",
                        gradeName: "gpii.nexus.atlasScientificDriver.phSensor"
                    }
                },
                collector: {
                    match: {
                        type: "gradeMatcher",
                        gradeName: "gpii.nexus.scienceLab.collector"
                    }
                }
            },
            product: {
                path: "sendPhSensor",
                options: {
                    type: "gpii.nexus.scienceLab.sendPhSensor"
                }
            }
        });
    },
    function () {
        return gpii.addNexusRecipe(nexusHost, nexusPort, "sendEcSensor", {
            reactants: {
                ecSensor: {
                    match: {
                        type: "gradeMatcher",
                        gradeName: "gpii.nexus.atlasScientificDriver.ecSensor"
                    }
                },
                collector: {
                    match: {
                        type: "gradeMatcher",
                        gradeName: "gpii.nexus.scienceLab.collector"
                    }
                }
            },
            product: {
                path: "sendEcSensor",
                options: {
                    type: "gpii.nexus.scienceLab.sendEcSensor"
                }
            }
        });
    },
    function () {
        return gpii.addNexusRecipe(nexusHost, nexusPort, "sendRpiTempSensor1", {
            reactants: {
                tempSensor: {
                    match: {
                        type: "gradeMatcher",
                        gradeName: "gpii.nexus.rpiSenseHatDriver.tempSensor1"
                    }
                },
                collector: {
                    match: {
                        type: "gradeMatcher",
                        gradeName: "gpii.nexus.scienceLab.collector"
                    }
                }
            },
            product: {
                path: "sendRpiTempSensor1",
                options: {
                    type: "gpii.nexus.scienceLab.sendRpiTempSensor1"
                }
            }
        });
    },
    function () {
        return gpii.addNexusRecipe(nexusHost, nexusPort, "sendRpiTempSensor2", {
            reactants: {
                tempSensor: {
                    match: {
                        type: "gradeMatcher",
                        gradeName: "gpii.nexus.rpiSenseHatDriver.tempSensor2"
                    }
                },
                collector: {
                    match: {
                        type: "gradeMatcher",
                        gradeName: "gpii.nexus.scienceLab.collector"
                    }
                }
            },
            product: {
                path: "sendRpiTempSensor2",
                options: {
                    type: "gpii.nexus.scienceLab.sendRpiTempSensor2"
                }
            }
        });
    }
]);
