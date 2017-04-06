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
            "gpii.nexus.fakeSensor",
            {
                gradeNames: [ "fluid.modelComponent" ],
                model: {
                    sensorData: { }
                }
            }
        );
    },
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.atlasScientificDriver.phSensor",
            {
                gradeNames: [ "fluid.modelComponent" ],
                model: {
                    sensorData: { }
                }
            }
        );
    },
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.atlasScientificDriver.ecSensor",
            {
                gradeNames: [ "fluid.modelComponent" ],
                model: {
                    sensorData: { }
                }
            }
        );
    },
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.rpiSenseHatDriver.tempSensor",
            {
                gradeNames: [ "fluid.modelComponent" ],
                model: {
                    sensorData: { }
                }
            }
        );
    },
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.scienceLab.collector",
            {
                gradeNames: [ "fluid.modelComponent" ],
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
                gradeNames: [ "gpii.nexus.recipeProduct" ],
                componentPaths: {
                    fakeSensor: null,
                    collector: null
                },
                components: {
                    fakeSensor: "@expand:fluid.componentForPath({recipeProduct}.options.componentPaths.fakeSensor)",
                    collector: "@expand:fluid.componentForPath({recipeProduct}.options.componentPaths.collector)"
                },
                modelRelay: {
                    target: "{collector}.model.sensors.fakeSensor",
                    forward: {
                        excludeSource: "init"
                    },
                    transform: {
                        transform: {
                            type: "fluid.identity",
                            input: "{fakeSensor}.model.sensorData"
                        },
                        history: {
                            transform: {
                                type: "gpii.nexus.transforms.appendToArray",
                                input: {
                                    transform: {
                                        type: "gpii.nexus.transforms.timeStamp",
                                        input: "{fakeSensor}.model.sensorData.value"
                                    }
                                },
                                sourceArray: "{collector}.model.sensors.fakeSensor.history",
                                maxLength: 10
                            }
                        }
                    }
                },
                listeners: {
                    "onDestroy.removeFakeSensor": {
                        listener: "{collector}.applier.change",
                        args: [ "sensors.fakeSensor", null, "DELETE" ]
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
                gradeNames: [ "gpii.nexus.recipeProduct" ],
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
                },
                listeners: {
                    "onDestroy.removePhSensor": {
                        listener: "{collector}.applier.change",
                        args: [ "sensors.phSensor", null, "DELETE" ]
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
                gradeNames: [ "gpii.nexus.recipeProduct" ],
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
                },
                listeners: {
                    "onDestroy.removeEcSensor": {
                        listener: "{collector}.applier.change",
                        args: [ "sensors.ecSensor", null, "DELETE" ]
                    }
                }
            }
        );
    },
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.scienceLab.sendRpiTempSensor",
            {
                gradeNames: [ "gpii.nexus.recipeProduct" ],
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
                    target: "{collector}.model.sensors.rpiTempSensor",
                    forward: {
                        excludeSource: "init"
                    },
                    singleTransform: {
                        type: "fluid.identity"
                    }
                },
                listeners: {
                    "onDestroy.removeRpiTempSensor": {
                        listener: "{collector}.applier.change",
                        args: [ "sensors.rpiTempSensor", null, "DELETE" ]
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
        return gpii.addNexusRecipe(nexusHost, nexusPort, "sendRpiTempSensor", {
            reactants: {
                tempSensor: {
                    match: {
                        type: "gradeMatcher",
                        gradeName: "gpii.nexus.rpiSenseHatDriver.tempSensor"
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
                path: "sendRpiTempSensor",
                options: {
                    type: "gpii.nexus.scienceLab.sendRpiTempSensor"
                }
            }
        });
    }
]);
