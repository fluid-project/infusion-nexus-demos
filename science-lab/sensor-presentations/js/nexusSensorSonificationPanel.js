(function () {
    "use strict";

    // Sonification presentation panel
    fluid.defaults("fluid.nexusSensorSonificationPanel", {
        gradeNames: ["fluid.nexusSensorPresentationPanel"],
        perSensorPresentationGrades: {
            "fakeSensorPH": "fluid.sensorPlayer.pH",
            "phSensor": "fluid.sensorPlayer.pH"
        },
        dynamicComponentContainerOptions: {
            // fluid.stringTemplate
            containerIndividualClassTemplate: "nexus-nexusSensorSonificationPanel-sensorDisplay-%sensorId"
        },
        defaultSensorPresentationGrade: "fluid.sensorPlayer",
        invokers: {
            "generatePresenterOptionsBlock": {
                funcName: "fluid.nexusSensorSonificationPanel.getSensorPresenterOptionsBlock",
                args: ["{arguments}.0", "{arguments}.1", "{arguments}.2"]
            }
        }
    });

    fluid.nexusSensorSonificationPanel.getSensorPresenterOptionsBlock = function (sensorPresenterModelOptions, sensorPresenterListenerOptions, sensorPresenterContainerClass) {
        var optionsBlock =
        {
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
                sensorSonifierDisplay: {
                    type: "fluid.nexusSensorSonificationPanel.sensorSonifierDisplay",
                    container: "." + sensorPresenterContainerClass,
                    createOnEvent: "{sensorPlayer}.events.onSensorDisplayContainerAppended"
                }
            }
        };
        return optionsBlock;
    };

    fluid.defaults("fluid.nexusSensorSonificationPanel.sensorSonifierDisplay", {
        gradeNames: ["fluid.nexusSensorPresentationPanel.fadeInPresenter", "fluid.viewComponent"],
        events: {
            displayTemplateReady: null
        },
        selectors: {
            sensorNameDisplay: ".nexusc-sensorNameDisplay",
            midpointToneControl: ".nexusc-midpointToneControl",
            muteControl: ".nexusc-sensorMuteControl"
        },
        strings: {
            template: "<h2 class=\"nexusc-sensorNameDisplay\"></h2><form class=\"nexus-sensorSonifierControls\"><span class=\"nexus-sensorSonifierControls-checkboxContainer nexusc-midpointToneControlContainer\"><label>Play Midpoint<input class=\"nexusc-midpointToneControl\" type=\"checkbox\"/><i></i></label></span><br/><span class=\"nexus-sensorSonifierControls-checkboxContainer nexusc-muteControlContainer\"><label>Mute Sensor<input class=\"nexusc-sensorMuteControl\" type=\"checkbox\"/><i></i></label></span> </form>"
        },
        listeners: {
            "onCreate.appendDisplayTemplate": {
                "this": "{that}.container",
                "method": "html",
                "args": "{that}.options.strings.template"
            },
            "onCreate.fireDisplayTemplateReady": {
                func: "{that}.events.displayTemplateReady.fire"
            },
            "onCreate.bindSynthControls": {
                func: "fluid.sensorPlayer.sensorDisplayDebug.bindSynthControls",
                args: ["{that}", "{sensorSonifier}"]
            }
        },
        components: {
            sensorNameDisplay: {
                createOnEvent: "{sensorSonifierDisplay}.events.displayTemplateReady",
                type: "fluid.sensorPlayer.valueDisplay",
                container: "{sensorSonifierDisplay}.dom.sensorNameDisplay",
                options: {
                    model: {
                        value: "{sensor}.model.description"
                    },
                    strings: {
                        template: "<span class=\"flc-valueDisplay-value\"></span>"
                    }
                }
            }
        }
    });

}());
