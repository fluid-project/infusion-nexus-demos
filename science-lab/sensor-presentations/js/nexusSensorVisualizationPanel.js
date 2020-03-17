(function () {
    "use strict";

    // Sonification presentation panel
    fluid.defaults("fluid.nexusSensorVisualizationPanel", {
        gradeNames: ["fluid.nexusSensorPresentationPanel"],
        // Key-value pairs of sensorIds / sensorPresenter grades
        perSensorPresentationGrades: {
            "fakeSensorPH": "fluid.nexusSensorVisualizer.pHScale",
            "fakeSensorTemperature": "fluid.nexusSensorVisualizer.temperature",
            "rpiTempSensor1": "fluid.nexusSensorVisualizer.temperature",
            "rpiTempSensor2": "fluid.nexusSensorVisualizer.temperature",
            "phSensor": "fluid.nexusSensorVisualizer.pHScale"
        },
        dynamicComponentContainerOptions: {
            // fluid.stringTemplate
            containerIndividualClassTemplate: "nexus-nexusSensorSonificationPanel-sensorDisplay-%sensorId"
        },
        defaultSensorPresentationGrade: "fluid.nexusSensorVisualizer.realTimeScale",
        invokers: {
            "generatePresenterOptionsBlock": {
                funcName: "fluid.nexusSensorVisualizationPanel.getSensorPresenterOptionsBlock",
                args: ["{arguments}.0", "{arguments}.1", "{arguments}.2"]
            }
        }
    });

    fluid.nexusSensorVisualizationPanel.getSensorPresenterOptions = function (sensorId, sensorName, sensorPresentationPanel) {

        var sensorPresenterModelOptions = fluid.nexusSensorPresentationPanel.getSensorModelOptions(sensorId);

        var sensorPresenterContainerClass = fluid.stringTemplate(sensorPresentationPanel.options.dynamicComponentContainerOptions.containerIndividualClassTemplate, {sensorId: sensorId});

        var sensorPresenterListenerOptions = fluid.nexusSensorPresentationPanel.getSensorPresenterListenerOptions(sensorId, sensorPresenterContainerClass, sensorName);

        return sensorPresentationPanel.generatePresenterOptionsBlock(sensorPresenterModelOptions, sensorPresenterListenerOptions, sensorPresenterContainerClass);
    };

    fluid.nexusSensorVisualizationPanel.getSensorPresenterOptionsBlock = function (sensorPresenterModelOptions, sensorPresenterListenerOptions, sensorPresenterContainerClass) {
        var optionsBlock = {
                events: {
                    onSensorDisplayContainerAppended: null
                },
                listeners: sensorPresenterListenerOptions,
                components: {
                    sensor: {
                        options: {
                            model: sensorPresenterModelOptions
                        }
                    },
                    visualizer: {
                        container: "." + sensorPresenterContainerClass
                    }
                }
        };

        return optionsBlock;
    };

    // Abstract grade used by sensor visualizer
    fluid.defaults("fluid.nexusSensorVisualizerBase", {
        gradeNames: ["fluid.component"],
        events: {
            onSensorDisplayContainerAppended: null
        },
        components: {
            sensor: {
                type: "fluid.modelComponent"
            },
            visualizer: {
                options: {
                    modelListeners: {
                        "{nexusSensorVisualizerBase}.sensor.model.sensorValue": {
                            funcName: "{that}.updateVisualizer",
                            args: ["{that}", "{change}"]
                        }
                    }
                },
                createOnEvent: "{nexusSensorVisualizerBase}.events.onSensorDisplayContainerAppended"
                // Must be specified; handled by dynamicComponents behaviour
                // container: ""
            }
        }
    });

    fluid.defaults("fluid.nexusVisualizerBase", {
        gradeNames: ["floe.svgDrawingArea"],
        events: {
            onUpdateCompleted: null
        },
        invokers: {
            "createVisualizer": {
                funcName: "fluid.notImplemented"
            },
            "updateVisualizer": {
                funcName: "fluid.notImplemented"
            }
        },
        visualizerOptions: {
            // In milliseconds
            transitionDuration: 1000
        },
        model: {
            svgTitle: "A sensor visualizer.",
            svgDescription: "A sensor visualizer."
        },
        strings: {
            sensorTitleTemplate: "<h2>%description</h2>"
        },
        listeners: {
            "onCreate.prependSensorTitle": {
                "this": "{that}.container",
                method: "prepend",
                args: {
                    expander: {
                        funcName: "fluid.stringTemplate",
                        args: ["{that}.options.strings.sensorTitleTemplate", "{sensor}.model"]
                    }
                }
            },
            "onCreate.createBaseSVGDrawingArea": {
                func: "{that}.createBaseSVGDrawingArea"
            },
            "onCreate.createVisualizer": {
                funcName: "{that}.createVisualizer",
                priority: "after:createBaseSVGDrawingArea"
            }
        }
    });

}());
