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
            "gpii.nexus.fakeSensorPH",
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
            "gpii.nexus.fakeSensorTemperature",
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
            "gpii.nexus.scienceLab.collector",
            {
                gradeNames: [ "fluid.modelComponent" ],
                model: {
                    sensors: { }
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
                    source: "{fakeSensor}.model.sensorData",
                    target: "{collector}.model.sensors.fakeSensor",
                    forward: {
                        excludeSource: "init"
                    },
                    singleTransform: {
                        type: "fluid.identity"
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
            "gpii.nexus.scienceLab.sendfakeSensorPH",
            {
                gradeNames: [ "gpii.nexus.recipeProduct" ],
                componentPaths: {
                    fakeSensorPH: null,
                    collector: null
                },
                components: {
                    fakeSensorPH: "@expand:fluid.componentForPath({recipeProduct}.options.componentPaths.fakeSensorPH)",
                    collector: "@expand:fluid.componentForPath({recipeProduct}.options.componentPaths.collector)"
                },
                modelRelay: {
                    source: "{fakeSensorPH}.model.sensorData",
                    target: "{collector}.model.sensors.fakeSensorPH",
                    forward: {
                        excludeSource: "init"
                    },
                    singleTransform: {
                        type: "fluid.identity"
                    }
                },
                listeners: {
                    "onDestroy.removefakeSensorPH": {
                        listener: "{collector}.applier.change",
                        args: [ "sensors.fakeSensorPH", null, "DELETE" ]
                    }
                }
            }
        );
    },
    function () {
        return gpii.writeNexusDefaults(
            nexusHost,
            nexusPort,
            "gpii.nexus.scienceLab.sendfakeSensorTemperature",
            {
                gradeNames: [ "gpii.nexus.recipeProduct" ],
                componentPaths: {
                    fakeSensorTemperature: null,
                    collector: null
                },
                components: {
                    fakeSensorTemperature: "@expand:fluid.componentForPath({recipeProduct}.options.componentPaths.fakeSensorTemperature)",
                    collector: "@expand:fluid.componentForPath({recipeProduct}.options.componentPaths.collector)"
                },
                modelRelay: {
                    source: "{fakeSensorTemperature}.model.sensorData",
                    target: "{collector}.model.sensors.fakeSensorTemperature",
                    forward: {
                        excludeSource: "init"
                    },
                    singleTransform: {
                        type: "fluid.identity"
                    }
                },
                listeners: {
                    "onDestroy.removefakeSensorTemperature": {
                        listener: "{collector}.applier.change",
                        args: [ "sensors.fakeSensorTemperature", null, "DELETE" ]
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
        return gpii.addNexusRecipe(nexusHost, nexusPort, "sendfakeSensorPH", {
            reactants: {
                fakeSensorPH: {
                    match: {
                        type: "gradeMatcher",
                        gradeName: "gpii.nexus.fakeSensorPH"
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
                path: "sendfakeSensorPH",
                options: {
                    type: "gpii.nexus.scienceLab.sendfakeSensorPH"
                }
            }
        });
    },
    function () {
        return gpii.addNexusRecipe(nexusHost, nexusPort, "sendfakeSensorTemperature", {
            reactants: {
                fakeSensorTemperature: {
                    match: {
                        type: "gradeMatcher",
                        gradeName: "gpii.nexus.fakeSensorTemperature"
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
                path: "sendfakeSensorTemperature",
                options: {
                    type: "gpii.nexus.scienceLab.sendfakeSensorTemperature"
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
    }
]);
