(function () {
    "use strict";

    fluid.defaults("fluid.nexusSensorVisualizer.sensorPercentage", {
        gradeNames: ["fluid.modelComponent"],
        modelRelay: [{
            target: "sensorPercentage",
            singleTransform: {
                type: "fluid.sensorPlayer.transforms.minMaxScale",
                input: "{sensor}.model.sensorValue",
                inputScaleMax: "{sensor}.model.sensorMax",
                inputScaleMin: "{sensor}.model.sensorMin",
                outputScaleMax: 100,
                outputScaleMin: 0
            }
        }]
    });

    fluid.defaults("fluid.nexusSensorVisualizer.circleRadius", {
        gradeNames: ["fluid.nexusSensorVisualizerBase"],
        components: {
            sensor: {
                options: {
                    gradeNames: ["fluid.nexusSensorVisualizer.sensorPercentage"]
                }
            },
            visualizer: {
                type: "fluid.nexusSensorVisualizer.circleRadius.visualizer"
            }
        }
    });

    fluid.defaults("fluid.nexusSensorVisualizer.circleRadius.visualizer", {
        gradeNames: ["fluid.nexusSensorPresentationPanel.fadeInPresenter",  "fluid.nexusVisualizerBase"],
        selectors: {
            sensorValueIndicator: ".nexus-nexusSensorVisualizationPanel-sensorDisplay-circle"
        },
        svgOptions: {
            height: 200,
            width: 200
        },
        invokers: {
            createVisualizer: {
                funcName: "fluid.nexusSensorVisualizer.circleRadius.visualizer.createVisualizer",
                args: ["{that}", "{sensor}.model.sensorPercentage"]
            },
            updateVisualizer: {
                funcName: "fluid.nexusSensorVisualizer.circleRadius.visualizer.updateVisualization"
            }
        }
    });

    fluid.nexusSensorVisualizer.circleRadius.visualizer.createVisualizer = function (that, initialSensorValue) {
        var svg = that.svg,
            height = that.options.svgOptions.height,
            width = that.options.svgOptions.width;

        // Background circle
        svg.append("circle")
            .attr({
                "class": "nexus-nexusSensorVisualizationPanel-sensorDisplay-circleOutline",
                cx: width / 2,
                cy: height / 2,
                r: height / 2,
                fill: "red"
            });

        // Indicator circle
        that.sensorValueIndicator = svg.append("circle")
            .attr({
                "class": "nexus-nexusSensorVisualizationPanel-sensorDisplay-circle",
                cx: width / 2,
                cy: height / 2,
                r: initialSensorValue / (height / 2),
                fill: "black"
            });
    };

    fluid.nexusSensorVisualizer.circleRadius.visualizer.updateVisualization = function (visualizer, change) {

        var height = visualizer.options.svgOptions.height;

        var transitionDuration = visualizer.options.visualizerOptions.transitionDuration;

        var circle = visualizer.sensorValueIndicator;
        circle
        .transition()
        .duration(transitionDuration)
        .attr("r", change.value * (height / 2 / 100))
        .each("end", function() {
            visualizer.events.onUpdateCompleted.fire();
        });
    };

    fluid.defaults("fluid.nexusSensorVisualizer.horizontalBar", {
        gradeNames: ["fluid.nexusSensorVisualizerBase"],
        components: {
            sensor: {
                options: {
                    gradeNames: ["fluid.nexusSensorVisualizer.sensorPercentage"]
                }
            },
            visualizer: {
                type: "fluid.nexusSensorVisualizer.horizontalBar.visualizer"
            }
        }
    });

    fluid.defaults("fluid.nexusSensorVisualizer.horizontalBar.visualizer", {
        gradeNames: ["fluid.nexusSensorPresentationPanel.fadeInPresenter", "fluid.nexusVisualizerBase"],
        selectors: {
            sensorValueIndicator: ".nexus-nexusSensorVisualizationPanel-sensorDisplay-bar"
        },
        svgOptions: {
            height: 200,
            width: 200
        },
        invokers: {
            createVisualizer: {
                funcName: "fluid.nexusSensorVisualizer.horizontalBar.visualizer.createVisualizer",
                args: ["{that}", "{sensor}.model.sensorPercentage"]
            },
            updateVisualizer: {
                funcName:
                "fluid.nexusSensorVisualizer.horizontalBar.visualizer.updateVisualization"
            }
        }
    });

    fluid.nexusSensorVisualizer.horizontalBar.visualizer.createVisualizer = function (that, initialValue) {
        var svg = that.svg,
            width = that.options.svgOptions.width,
            height = that.options.svgOptions.height;

        svg.append("rect")
            .attr({
                "class": "nexus-nexusSensorVisualizationPanel-sensorDisplay-barBackground",
                width: width,
                height: height / 2,
                fill: "red"
            });

        that.sensorValueIndicator = svg.append("rect")
            .attr({
                "class": "nexus-nexusSensorVisualizationPanel-sensorDisplay-bar",
                width: initialValue * (width / 2),
                height: height / 2,
                fill: "blue"
            });
    };

    fluid.nexusSensorVisualizer.horizontalBar.visualizer.updateVisualization = function (visualizer, change) {
        var bar = visualizer.sensorValueIndicator,
            width = visualizer.options.svgOptions.width;

        var transitionDuration = visualizer.options.visualizerOptions.transitionDuration;

        bar
        .transition()
        .duration(transitionDuration)
        .attr("width", change.value * (width / 100))
        .each("end", function() {
            visualizer.events.onUpdateCompleted.fire();
        });
    };
}());
