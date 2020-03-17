/* global fluid, jqUnit */

(function () {

    "use strict";

    fluid.defaults("fluid.tests.sensorPresentationPanelTests", {
        gradeNames: ["fluid.test.testEnvironment"],
        components: {
            sensorPresentationPanelTester: {
                type: "fluid.tests.sensorPresentationPanelTester"
            }
        }
    });

    fluid.defaults("fluid.tests.sensorVisualizationPanelTests", {
        gradeNames: ["fluid.tests.sensorPresentationPanelTests"],

        components: {
            sensorPresentationPanel: {
                type: "fluid.nexusSensorVisualizationPanelMock",
                container: ".nexus-nexusSensorVisualizationPanel",
                createOnEvent: "{sensorPresentationPanelTester}.events.onTestCaseStart",
                options: {
                    containerClassKey: "visualizerClass"
                }
            },
            sensorPresentationPanelTester: {
                type: "fluid.tests.sensorVisualizationPanelTester"
            }
        }
    });

    fluid.defaults("fluid.tests.sensorSonificationPanelTests", {
        gradeNames: ["fluid.tests.sensorPresentationPanelTests"],
        components: {
            sensorPresentationPanel: {
                type: "fluid.nexusSensorSonificationPanelMock",
                container: ".nexus-nexusSensorSonificationPanel",
                createOnEvent: "{sensorPresentationPanelTester}.events.onTestCaseStart",
                options: {
                    containerClassKey: "sonifierClass"
                }
            },
            sensorPresentationPanelTester: {
                type: "fluid.tests.sensorSonificationPanelTester"
            }
        }
    });

    fluid.defaults("fluid.tests.sensorPresentationPanelTester", {
        gradeNames: ["fluid.test.testCaseHolder"],
        modules: [{
            name: "Test sensor presentation panel",
            tests: [{
                name: "Test presentation panel sensor create and remove behaviour",
                expect: 12,
                sequence: [{
                    func: "fluid.tests.sensorPresentationPanelTester.testCreateSensor",
                    args: ["{sensorPresentationPanel}"]
                },
                {
                  func: "fluid.tests.sensorPresentationPanelTester.testRemoveSensor",
                  args: ["{sensorPresentationPanel}"]
                }]
            }]
        },
        {
            name: "Test sensor ordering",
            tests: [{
                name: "Test presentation panel sensor ordering",
                expect: 20,
                sequence: [{
                    func: "fluid.tests.sensorPresentationPanelTester.testSensorOrdering",
                    args: ["{sensorPresentationPanel}"]
                }]
            }]
        }]
    });

    fluid.defaults("fluid.tests.sensorVisualizationPanelTester", {
        gradeNames: ["fluid.tests.sensorPresentationPanelTester"],
        modules: [{
            name: "Test sensor visualization panel"
        },
        {
            name: "Test sensor visualization panel ordering"
        }]
    });

    fluid.defaults("fluid.tests.sensorSonificationPanelTester", {
        gradeNames: ["fluid.tests.sensorPresentationPanelTester"],
        modules: [{
            name: "Test sensor sonification panel"
        },
        {
            name: "Test sensor sonification panel ordering"
        }]
    });

    // Fake sensor definitions for use in testing
    var fakeSensors = {
      fakeSensorPH: {
          "name": "Fake pH Sensor",
          "value": 7,
          "rangeMax": 14,
          "rangeMin": 0,
          "visualizerClass": "nexus-nexusSensorVisualizationPanel-sensorDisplay-fakeSensorPH",
          "sonifierClass": "nexus-nexusSensorSonificationPanel-sensorDisplay-fakeSensorPH"
      },
      fakeSensorTemperature: {
          "name": "Fake Temperature Sensor",
          "value": 15,
          "rangeMax": 50,
          "rangeMin": 0,
          "visualizerClass": "nexus-nexusSensorVisualizationPanel-sensorDisplay-fakeSensorTemperature",
          "sonifierClass": "nexus-nexusSensorSonificationPanel-sensorDisplay-fakeSensorTemperature"
      },
      fakeSensorAlpha: {
          "name": "Fake Alpha Sensor",
          "value": 6,
          "rangeMax": 10,
          "rangeMin": 1,
          "visualizerClass": "nexus-nexusSensorVisualizationPanel-sensorDisplay-fakeSensorAlpha",
          "sonifierClass": "nexus-nexusSensorSonificationPanel-sensorDisplay-fakeSensorAlpha"
      },
      fakeSensorBeta: {
          "name": "Fake Beta Sensor",
          "value": 3,
          "rangeMax": 10,
          "rangeMin": 1,
          "visualizerClass": "nexus-nexusSensorVisualizationPanel-sensorDisplay-fakeSensorBeta",
          "sonifierClass": "nexus-nexusSensorSonificationPanel-sensorDisplay-fakeSensorBeta"
      },
      fakeSensorGamma: {
          "name": "Fake Gamma Sensor",
          "value": 8,
          "rangeMax": 10,
          "rangeMin": 1,
          "visualizerClass": "nexus-nexusSensorVisualizationPanel-sensorDisplay-fakeSensorGamma",
          "sonifierClass": "nexus-nexusSensorSonificationPanel-sensorDisplay-fakeSensorGamma"
      }
  };

    fluid.tests.sensorPresentationPanelTester.verifyAttachedSensorTracking = function (sensorPresentationPanel, sensorKey, verifyAbsence) {

        var verifyFunction = verifyAbsence ? "assertUndefined" : "assertNotUndefined";

        var verifyText = verifyAbsence ? "does not contain" : "contains";

        jqUnit[verifyFunction]("attachedSensors object " + verifyText + " " + sensorKey, sensorPresentationPanel.attachedSensors[sensorKey]);
    };

    fluid.tests.sensorPresentationPanelTester.verifySensorContainer = function(sensorPresentationPanel, sensorvisualizerClass, verifyAbsence) {

        var verifyLength = verifyAbsence ? 0 : 1;

        var verifyText = verifyAbsence ? "absent" : "present";

        var sensorContainer = sensorPresentationPanel.container.find(sensorvisualizerClass);

        jqUnit.assertTrue("Container with class " + sensorvisualizerClass + " " + verifyText, sensorContainer.length === verifyLength);
    };

    fluid.tests.sensorPresentationPanelTester.verifySensorPresenterCreation = function (sensorPresentationPanel, sensorKey, expectedAttachedContainersLength) {

        var containerClassKey = sensorPresentationPanel.options.containerClassKey;

        fluid.tests.sensorPresentationPanelTester.verifyAttachedSensorTracking(sensorPresentationPanel, sensorKey);

        fluid.tests.sensorPresentationPanelTester.verifySensorContainer(sensorPresentationPanel, "." + fakeSensors[sensorKey][containerClassKey]);

        jqUnit.assertTrue("attachedContainers array is at expected length of " + expectedAttachedContainersLength, sensorPresentationPanel.attachedContainers.length === expectedAttachedContainersLength);
    };

    fluid.tests.sensorPresentationPanelTester.verifySensorPresenterRemoval = function (sensorPresentationPanel, sensorKey, expectedAttachedContainersLength) {

        var containerClassKey = sensorPresentationPanel.options.containerClassKey;

        fluid.tests.sensorPresentationPanelTester.verifyAttachedSensorTracking(sensorPresentationPanel, sensorKey, true);

        fluid.tests.sensorPresentationPanelTester.verifySensorContainer(sensorPresentationPanel, "." + fakeSensors[sensorKey][containerClassKey], true);

        jqUnit.assertTrue("attachedContainers array is at expected length of " + expectedAttachedContainersLength, sensorPresentationPanel.attachedContainers.length === expectedAttachedContainersLength);
    };

    fluid.tests.sensorPresentationPanelTester.testCreateSensor = function (sensorPresentationPanel) {

        // Add a first sensor
        sensorPresentationPanel.applier.change("sensors.fakeSensorPH",
        fakeSensors.fakeSensorPH);

        fluid.tests.sensorPresentationPanelTester.verifySensorPresenterCreation(sensorPresentationPanel, "fakeSensorPH", 1);

        // Add a second sensor
        sensorPresentationPanel.applier.change("sensors.fakeSensorTemperature",
        fakeSensors.fakeSensorTemperature);

        fluid.tests.sensorPresentationPanelTester.verifySensorPresenterCreation(sensorPresentationPanel, "fakeSensorTemperature", 2);
    };

    fluid.tests.sensorPresentationPanelTester.testRemoveSensor = function (sensorPresentationPanel) {
        sensorPresentationPanel.applier.change("sensors.fakeSensorPH", null, "DELETE");

        fluid.tests.sensorPresentationPanelTester.verifySensorPresenterRemoval(sensorPresentationPanel, "fakeSensorPH", 1);

        sensorPresentationPanel.applier.change("sensors.fakeSensorTemperature", null, "DELETE");

        fluid.tests.sensorPresentationPanelTester.verifySensorPresenterRemoval(sensorPresentationPanel, "fakeSensorTemperature", 0);
    };

    var sensorOrderSpecs = {
        betaFirst: [
            fakeSensors.fakeSensorBeta
        ],
        alphaFirstBetaSecond: [
            fakeSensors.fakeSensorAlpha,
            fakeSensors.fakeSensorBeta
        ],
        alphaFirstBetaSecondGammaThird: [
            fakeSensors.fakeSensorAlpha,
            fakeSensors.fakeSensorBeta,
            fakeSensors.fakeSensorGamma
        ],
        alphaFirstGammaSecond: [
            fakeSensors.fakeSensorAlpha,
            fakeSensors.fakeSensorGamma
        ]
    };

    fluid.tests.sensorPresentationPanelTester.verifySensorOrdering = function (sensorPresentationPanel, sensorOrderSpec) {

        var containerClassKey = sensorPresentationPanel.options.containerClassKey;

        var sensorContainers = sensorPresentationPanel.container.find( ".nexus-nexusSensorPresentationPanel-sensorDisplay");

        jqUnit.assertTrue("Number of sensor containers as expected", sensorContainers.length === sensorOrderSpec.length);

        fluid.each(sensorOrderSpec, function (sensor, idx) {

            jqUnit.assertEquals(sensor.name + " at position " + idx + " of attachedContainers array", sensorPresentationPanel.attachedContainers[idx].sensorName, sensor.name);

            jqUnit.assertTrue("Sensor container at position " + idx + " in DOM ordering has expected class of " + sensor[containerClassKey], $(sensorContainers[idx]).hasClass(sensor[containerClassKey]));

        });
    };

    fluid.tests.sensorPresentationPanelTester.testSensorOrdering = function (sensorPresentationPanel) {

        sensorPresentationPanel.applier.change("sensors.fakeSensorBeta",
        fakeSensors.fakeSensorBeta);

        fluid.tests.sensorPresentationPanelTester.verifySensorOrdering(sensorPresentationPanel, sensorOrderSpecs.betaFirst);

        sensorPresentationPanel.applier.change("sensors.fakeSensorAlpha",
        fakeSensors.fakeSensorAlpha);

        fluid.tests.sensorPresentationPanelTester.verifySensorOrdering(sensorPresentationPanel, sensorOrderSpecs.alphaFirstBetaSecond);

        sensorPresentationPanel.applier.change("sensors.fakeSensorGamma",
        fakeSensors.fakeSensorGamma);

        fluid.tests.sensorPresentationPanelTester.verifySensorOrdering(sensorPresentationPanel, sensorOrderSpecs.alphaFirstBetaSecondGammaThird);

        sensorPresentationPanel.applier.change("sensors.fakeSensorBeta",
        null, "DELETE");

        fluid.tests.sensorPresentationPanelTester.verifySensorOrdering(sensorPresentationPanel, sensorOrderSpecs.alphaFirstGammaSecond);
    };

    fluid.tests.sensorVisualizationPanelTests();

    fluid.tests.sensorSonificationPanelTests();

}());
