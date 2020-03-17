(function () {
    "use strict";

    fluid.defaults("fluid.nexusSensorVisualizer.lineChart", {
        gradeNames: ["fluid.nexusSensorVisualizerBase"],
        components: {
            visualizer: {
                type: "fluid.nexusSensorVisualizer.lineChart.visualizer",
                options: {
                    scaleOptions: {
                        // transform rules to apply to yScale min
                        yScaleMinTransform: {
                            "literalValue": "{sensor}.model.sensorMin"
                        },
                        // transform rules to apply to yScale max
                        yScaleMaxTransform: {
                            "literalValue": "{sensor}.model.sensorMax"
                        }
                    }
                }
            },
            sensorValueAccumulator: {
                type: "fluid.modelComponent",
                options: {
                    model: {
                        sensorValues: [],
                        maxValuesRetained: 50
                    }
                }
            }
        }
    });

    fluid.nexusSensorVisualizer.lineChart.accumulateSensorValues = function (sensorValueAccumulator, visualizer, change) {

        var maxValuesRetained = fluid.get(sensorValueAccumulator.model, "maxValuesRetained");

        var currentSensorValues = fluid.copy(fluid.get(sensorValueAccumulator.model, "sensorValues"));
        var currentTime = new Date();

        if(currentSensorValues.length >= maxValuesRetained) {
            currentSensorValues.shift();
        }

        var sensorRecord = {
            "date": currentTime,
            "value": change.value
        };

        currentSensorValues.push(sensorRecord);

        sensorValueAccumulator.applier.change("sensorValues", currentSensorValues);

        visualizer.applier.change("dataSet", currentSensorValues);
    };

    fluid.defaults("fluid.nexusSensorVisualizer.lineChart.visualizer", {
        gradeNames: ["fluid.nexusSensorPresentationPanel.fadeInPresenter", "floe.chartAuthoring.lineChart.timeSeriesSingleDataSet", "fluid.nexusVisualizerBase"],
        invokers: {
            transitionChartLine: {
                funcName: "floe.chartAuthoring.lineChart.timeSeries.line.updateChartLine.defaultTransition"
            },
            // Line chart component does this itself
            createVisualizer: {
                funcName: "fluid.identity"
            },
            updateVisualizer: {
                funcName: "fluid.nexusSensorVisualizer.lineChart.accumulateSensorValues",
                args: ["{sensorValueAccumulator}", "{arguments}.0", "{arguments}.1"]
            }
        },
        // Line chart component does this itself
        listeners: {
            "onCreate.createBaseSVGDrawingArea": {
                funcName: "fluid.identity"
            }
        }
    });

}());
