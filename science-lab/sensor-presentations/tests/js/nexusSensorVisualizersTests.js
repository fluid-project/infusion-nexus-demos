/* global fluid, jqUnit */

(function () {

    "use strict";

    fluid.defaults("fluid.tests.visualizerTestsBase", {
        gradeNames: ["fluid.test.testEnvironment"],
        components: {
            visualizerTester: {
                type: "fluid.tests.visualizerTester"
            },
            sensorVisualizer: {
                createOnEvent: "{visualizerTester}.events.onTestCaseStart",
                options: {
                    gradeNames: ["fluid.tests.testVisualizerBase"]
                }
            }
        }
    });

    fluid.defaults("fluid.tests.testVisualizerBase", {
        gradeNames: ["fluid.nexusSensorVisualizerBase"],
        components: {
            sensor: {
                type: "fluid.modelComponent",
                options: {
                    model: {
                        sensorValue: 50,
                        sensorMax: 100,
                        sensorMin: 0,
                        description: "A fake sensor"
                    }
                }
            },
            visualizer: {
                createOnEvent: "{testVisualizerBase}.events.onCreate",
                options: {
                    visualizerOptions: {
                        transitionDuration: 100
                    }
                }
                // Must be specified
                // container: ""
            }
        }
    });

    fluid.tests.generateVisualizerIndicatorTestSequence = function(testSpec) {
        var sequence = [];

        fluid.each(testSpec.sequence, function (sequenceItem) {
            var applier = {
                func: "{sensorVisualizer}.sensor.applier.change",
                args: ["sensorValue", sequenceItem.sensorValue]
            };

            var listener = {
                event: "{sensorVisualizer}.visualizer.events.onUpdateCompleted",
                listener: "fluid.tests.verifyIndicator",
                args: ["{sensorVisualizer}.visualizer.dom.sensorValueIndicator", testSpec.checkAttribute, sequenceItem.attributeValue]
            };

            sequence.push(applier, listener);
        });
        return sequence;
    };

    fluid.defaults("fluid.tests.realTimeVisualizerTests", {
        gradeNames: ["fluid.tests.visualizerTestsBase"],
        components: {
            visualizerTester: {
                type: "fluid.tests.realTimeVisualizerTester"
            },
            sensorVisualizer: {
                type: "fluid.nexusSensorVisualizer.realTimeScale",
                options: {
                    components: {
                        visualizer: {
                            container: "#visualizer-realTimeScale"
                        }
                    }
                }
            }
        }
    });

    fluid.tests.realTimeVisualizerTestSequence = {
            checkAttribute: "height",
            // Left: sensor value change (num)
            // Right: expected corresponding change to
            // indicator attribute (string)
            sequence: [
                {
                    sensorValue: 50,
                    attributeValue: "230"
                },
                {
                    sensorValue: 75,
                    attributeValue: "345"
                },
                {
                    sensorValue: 25,
                    attributeValue: "115"
                },
                {
                    sensorValue: 100,
                    attributeValue: "460"
                }
            ]
    };

    fluid.defaults("fluid.tests.realTimeVisualizerTester", {
        gradeNames: ["fluid.test.testCaseHolder"],
        modules: [{
            name: "Test real-time visualizer",
            tests: [{
                name: "Test indicator response to sensor model changes",
                expect: 4,
                sequence: fluid.tests.generateVisualizerIndicatorTestSequence(fluid.tests.realTimeVisualizerTestSequence)
            }]
        }]
    });

    fluid.defaults("fluid.tests.circularPercentageScaleVisualizerTests", {
        gradeNames: ["fluid.tests.visualizerTestsBase"],
        components: {
            visualizerTester: {
                type: "fluid.tests.circularPercentageScaleVisualizerTester"
            },
            sensorVisualizer: {
                type: "fluid.nexusSensorVisualizer.circleRadius",
                options: {
                    components: {
                        visualizer: {
                            container: "#visualizer-circularPercentageScale"
                        }
                    }
                }
            }
        }
    });

    fluid.tests.circularPercentageScaleVisualizerTestSequence = {
            checkAttribute: "r",
            sequence: [
                {
                    sensorValue: 50,
                    attributeValue: "50"
                },
                {
                    sensorValue: 25,
                    attributeValue: "25"
                },
                {
                    sensorValue: 75,
                    attributeValue: "75"
                },
                {
                    sensorValue: 100,
                    attributeValue: "100"
                }
            ]
    };

    fluid.defaults("fluid.tests.circularPercentageScaleVisualizerTester", {
        gradeNames: ["fluid.test.testCaseHolder"],
        modules: [{
            name: "Test circular percentage scale visualizer",
            tests: [{
                name: "Test indicator response to sensor model changes",
                expect: 4,
                sequence: fluid.tests.generateVisualizerIndicatorTestSequence(fluid.tests.circularPercentageScaleVisualizerTestSequence)
            }]
        }]
    });

    fluid.defaults("fluid.tests.horizontalBarPercentageScaleVisualizerTests", {
        gradeNames: ["fluid.tests.visualizerTestsBase"],
        components: {
            visualizerTester: {
                type: "fluid.tests.horizontalBarPercentageScaleVisualizerTester"
            },
            sensorVisualizer: {
                type: "fluid.nexusSensorVisualizer.horizontalBar",
                options: {
                    components: {
                        visualizer: {
                            container: "#visualizer-horizontalBarPercentageScale"
                        }
                    }
                }
            }
        }
    });

    fluid.tests.horizontalBarPercentageScaleVisualizerTestSequence = {
            checkAttribute: "width",
            sequence: [
                {
                    sensorValue: 50,
                    attributeValue: "100"
                },
                {
                    sensorValue: 25,
                    attributeValue: "50"
                },
                {
                    sensorValue: 75,
                    attributeValue: "150"
                },
                {
                    sensorValue: 100,
                    attributeValue: "200"
                }
            ]
    };

    fluid.defaults("fluid.tests.horizontalBarPercentageScaleVisualizerTester", {
        gradeNames: ["fluid.test.testCaseHolder"],
        modules: [{
            name: "Test horizontal bar percentage scale visualizer",
            tests: [{
                name: "Test indicator response to sensor model changes",
                expect: 4,
                sequence: fluid.tests.generateVisualizerIndicatorTestSequence(fluid.tests.horizontalBarPercentageScaleVisualizerTestSequence)
            }]
        }]
    });

    fluid.defaults("fluid.tests.colorScaleVisualizerTests", {
        gradeNames: ["fluid.tests.visualizerTestsBase"],
        components: {
            visualizerTester: {
                type: "fluid.tests.colorScaleVisualizerTester"
            },
            sensorVisualizer: {
                type: "fluid.nexusSensorVisualizer.colorScale",
                options: {
                    components: {
                        visualizer: {
                            container: "#visualizer-colorScale",
                            options: {
                                scaleOptions: {
                                    colors: ["#FF0000","#00FF00", "#0000FF"],
                                    textOptions: {
                                        positionedText: {
                                            0: "0",
                                            50: "50",
                                            100: "100"
                                        }
                                    }
                                }

                            }
                        }
                    }
                }
            }
        }
    });

    fluid.tests.colorScaleVisualizerTestSequence = {
            checkAttribute: "transform",
            sequence: [
                {
                    sensorValue: 50,
                    attributeValue: "translate(40,235)"
                },
                {
                    sensorValue: 25,
                    attributeValue: "translate(40,350)"
                },
                {
                    sensorValue: 75,
                    attributeValue: "translate(40,120)"
                },
                {
                    sensorValue: 100,
                    attributeValue: "translate(40,5)"
                }
            ]
    };


    fluid.tests.expectedColorBarLabelValues = [
        {
            text: "0.00 – 33.33",
            y: "406.6666666666667"
        },
        {
            text: "33.33 – 66.67",
            y: "253.33333333333334"
        },
        {
            text: "66.67 – 100.00",
            y: "100"
        }
    ];

    fluid.tests.expectedColorBarPositionedValues = [
        {
            text: "0",
            y: "480"
        },
        {
            text: "50",
            y: "250"
        },
        {
            text: "100",
            y: "20"
        }
    ];

    fluid.defaults("fluid.tests.colorScaleVisualizerTester", {
        gradeNames: ["fluid.test.testCaseHolder"],
        modules: [{
            name: "Test color scale visualizer",
            tests: [{
                name: "Test indicator response to sensor model changes",
                expect: 4,
                sequence: fluid.tests.generateVisualizerIndicatorTestSequence(fluid.tests.colorScaleVisualizerTestSequence)
            },{
                name: "Test color scale generation",
                expect: 3,
                sequence: [
                    {
                        func: "fluid.tests.verifyColorScaleGeneration",
                        args: ["{sensorVisualizer}"]
                    }
                ]
            },
            {
                name: "Test indicator color change when moving through color scale",
                expect: 3,
                sequence: [
                    {
                        func: "{sensorVisualizer}.sensor.applier.change",
                        args: ["sensorValue", 55]
                    },
                    {
                        listener: "fluid.tests.verifyIndicatorColor",
                        event: "{sensorVisualizer}.visualizer.events.onUpdateCompleted",
                        args: ["{sensorVisualizer}", "#00FF00"]
                    },
                    {
                        func: "{sensorVisualizer}.sensor.applier.change",
                        args: ["sensorValue", 25]
                    },
                    {
                        listener: "fluid.tests.verifyIndicatorColor",
                        event: "{sensorVisualizer}.visualizer.events.onUpdateCompleted",
                        args: ["{sensorVisualizer}", "#FF0000"]
                    },
                    {
                        func: "{sensorVisualizer}.sensor.applier.change",
                        args: ["sensorValue", 75]
                    },
                    {
                        listener: "fluid.tests.verifyIndicatorColor",
                        event: "{sensorVisualizer}.visualizer.events.onUpdateCompleted",
                        args: ["{sensorVisualizer}", "#0000FF"]
                    }
                ]
            },{
                name: "Test labels",
                expect: 12,
                sequence: [
                    {
                        func: "fluid.tests.verifyColorBarLabels",
                        args: ["{sensorVisualizer}", "colorBarLabels", fluid.tests.expectedColorBarLabelValues]
                    },
                    {
                        func: "fluid.tests.verifyColorBarLabels",
                        args: ["{sensorVisualizer}", "positionedText", fluid.tests.expectedColorBarPositionedValues]
                    }
                ]
            }
            ]
        }]
    });

    fluid.tests.verifyColorBarLabels = function (sensorVisualizer, labelSelector, expectedValues) {

        var barLabels = sensorVisualizer.visualizer.locate(labelSelector);
        fluid.each(barLabels, function (barLabel, idx) {
            var valueSet = expectedValues[idx];
            fluid.each(valueSet, function (expectedValue, key) {

                var message = fluid.stringTemplate("Bar label %expectedAttribute is expected value of %expectedValue", {expectedAttribute: key, expectedValue: expectedValue});

                var value = (key === "text") ? $(barLabel).text() : $(barLabel).attr(key);

                jqUnit.assertEquals(message, expectedValue, value);
            });
        });
    };

    fluid.tests.verifyIndicatorColor = function (sensorVisualizer, expectedColor) {
        var indicator = sensorVisualizer.visualizer.locate("sensorValueIndicator");

        jqUnit.assertEquals("Indicator fill color is expected value of " + expectedColor, expectedColor.toLowerCase(), indicator.attr("fill").toLowerCase());
    };

    fluid.tests.verifyColorScaleGeneration = function (sensorVisualizer) {
        var colors = sensorVisualizer.visualizer.options.scaleOptions.colors;
        // ["#FF0000", "#00FF00", "#0000FF"]
        var colorBars = sensorVisualizer.visualizer.locate("colorBars");

        fluid.each(colors, function (currentColor, idx) {
            var message = fluid.stringTemplate("Color bar at position %idx is expected value of %color", {color: currentColor, idx: idx});
            var currentBar = colorBars[idx];
            jqUnit.assertEquals(message, currentColor, $(currentBar).attr("fill"));
        });

    };

    fluid.defaults("fluid.tests.lineChartVisualizerTests", {
        gradeNames: ["fluid.tests.visualizerTestsBase"],
        components: {
            visualizerTester: {
                type: "fluid.tests.lineChartVisualizerTester"
            },
            sensorVisualizer: {
                type: "fluid.nexusSensorVisualizer.lineChart",
                options: {
                    components: {
                        visualizer: {
                            container: "#visualizer-lineChart"
                        },
                        sensorValueAccumulator: {
                            options: {
                                model: {
                                    maxValuesRetained: 5
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    // First value is 50, it should get popped
    // off after the final change because the
    // maxValuesRetained is set to 5
    fluid.tests.lineChartAccumulatorExpectedValues = [
            [50, 25],
            [50, 25, 35],
            [50, 25, 35, 45],
            [50, 25, 35, 45, 55],
            [25, 35, 45, 55, 65]
    ];

    fluid.defaults("fluid.tests.lineChartVisualizerTester", {
        gradeNames: ["fluid.test.testCaseHolder"],
        modules: [{
            name: "Test line chart visualizer",
            tests: [{
                name: "Test line chart sensor value accumulator",
                expect: 19,
                sequence: [
                    {
                        func: "{sensorVisualizer}.sensor.applier.change",
                        args: ["sensorValue", 25]
                    },
                    {
                        func: "fluid.tests.verifyLineChartSensorValueAccumulation",
                        args: ["{sensorVisualizer}.sensorValueAccumulator", fluid.tests.lineChartAccumulatorExpectedValues[0]]
                    },
                    {
                        func: "{sensorVisualizer}.sensor.applier.change",
                        args: ["sensorValue", 35]
                    },
                    {
                        func: "fluid.tests.verifyLineChartSensorValueAccumulation",
                        args: ["{sensorVisualizer}.sensorValueAccumulator", fluid.tests.lineChartAccumulatorExpectedValues[1]]
                    },
                    {
                        func: "{sensorVisualizer}.sensor.applier.change",
                        args: ["sensorValue", 45]
                    },
                    {
                        func: "fluid.tests.verifyLineChartSensorValueAccumulation",
                        args: ["{sensorVisualizer}.sensorValueAccumulator", fluid.tests.lineChartAccumulatorExpectedValues[2]]
                    },
                    {
                        func: "{sensorVisualizer}.sensor.applier.change",
                        args: ["sensorValue", 55]
                    },
                    {
                        func: "fluid.tests.verifyLineChartSensorValueAccumulation",
                        args: ["{sensorVisualizer}.sensorValueAccumulator", fluid.tests.lineChartAccumulatorExpectedValues[3]]
                    },
                    {
                        func: "{sensorVisualizer}.sensor.applier.change",
                        args: ["sensorValue", 65]
                    },
                    {
                        func: "fluid.tests.verifyLineChartSensorValueAccumulation",
                        args: ["{sensorVisualizer}.sensorValueAccumulator", fluid.tests.lineChartAccumulatorExpectedValues[4]]
                    }
                ]
            }]
        }]
    });

    fluid.tests.verifyLineChartSensorValueAccumulation = function(accumulator, expected) {
        fluid.each(expected, function (expectedValue, idx) {
            var message = fluid.stringTemplate("Accumulator value at position %idx is expected value of %value", {idx: idx, value: accumulator.model.sensorValues[idx].value});
            jqUnit.assertEquals(message, expectedValue, accumulator.model.sensorValues[idx].value);
        });
    };

    fluid.tests.verifyIndicator = function (indicator, checkAttribute, expectedValue) {
        var message = fluid.stringTemplate("Attribute '%checkAttribute' is expected value of %expectedValue", {checkAttribute: checkAttribute, expectedValue: expectedValue});
        jqUnit.assertEquals(message, expectedValue, indicator.attr(checkAttribute));
    };

    fluid.tests.realTimeVisualizerTests();
    fluid.tests.circularPercentageScaleVisualizerTests();
    fluid.tests.horizontalBarPercentageScaleVisualizerTests();
    fluid.tests.colorScaleVisualizerTests();
    fluid.tests.lineChartVisualizerTests();

}());
