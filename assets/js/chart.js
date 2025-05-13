document.addEventListener("DOMContentLoaded", function () {
    Chart.register(ChartDataLabels);

    // Set the direction for Chart.js
    Chart.defaults.font.family = "Qs_Iranyekan";
    Chart.defaults.color = "#666";

    const ctx = document.getElementById("projectChart").getContext("2d");
    let projectChart;

    // Chart configurations based on filter
    const chartConfigs = {
        all: {
            data: [15, 35, 21, 29],
            labels: [
                "تعیین محدوده:",
                "نقشه برداری:",
                "تفکیک:",
                "بازنگری موضعی:",
            ],
        },
    };

    // Values to display after the label
    const labelValues = {
        all: ["۶ (پروژه)", "۸ (پروژه)", "۱ (پروژه)", "۴ (پروژه)"],
        1: ["۴ (پروژه)", "۶ (پروژه)", "۱ (پروژه)", "۳ (پروژه)"],
        2: ["۲ (پروژه)", "۳ (پروژه)", "۱ (پروژه)", "۲ (پروژه)"],
        3: ["۱ (پروژه)", "۲ (پروژه)", "۰ (پروژه)", "۱ (پروژه)"],
    };

    // Custom plugin to create RTL legend
    const rtlLegendPlugin = {
        id: "rtlLegend",
        afterRender: (chart, args, options) => {
            const legendContainer = document.getElementById(
                "chartLegendContainer"
            );
            if (!legendContainer) return;

            // Get selected filter
            const filter =
                document.getElementById("chartFilter").value || "all";

            // Clear previous legend
            legendContainer.innerHTML = "";

            // Create custom legend
            const ul = document.createElement("ul");
            ul.className = "custom-chart-legend";

            chart.data.labels.forEach((label, index) => {
                const li = document.createElement("li");
                li.className = "custom-legend-item";

                const colorBox = document.createElement("span");
                colorBox.className = "custom-legend-color";
                colorBox.style.backgroundColor =
                    chart.data.datasets[0].backgroundColor[index];

                // Create a container for the text elements
                const textContainer = document.createElement("div");
                textContainer.className = "legend-text-container";

                const labelSpan = document.createElement("span");
                labelSpan.className = "custom-legend-label";
                labelSpan.textContent = label;

                const valueSpan = document.createElement("span");
                valueSpan.className = "custom-legend-value";
                valueSpan.textContent = labelValues[filter][index];

                textContainer.appendChild(labelSpan);
                textContainer.appendChild(valueSpan);

                li.appendChild(colorBox);
                li.appendChild(textContainer);

                ul.appendChild(li);
            });

            legendContainer.appendChild(ul);
        },
    };

    // Initialize chart with default data
    function createChart(filter = "all") {
        const config = chartConfigs[filter];

        // Destroy existing chart if it exists
        if (projectChart) {
            projectChart.destroy();
        }

        // Create new chart
        projectChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        data: config.data,
                        backgroundColor: [
                            "#1b84ff",
                            "#f6b100",
                            "#10b981",
                            "#ff6f1e",
                        ],
                        borderWidth: 0,
                        hoverOffset: 4,
                    },
                ],
                labels: config.labels,
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "70%",
                plugins: {
                    datalabels: {
                        formatter: (value) => value + "%",
                        color: "#fff",
                        font: {
                            weight: "bold",
                            size: 11,
                        },
                        anchor: "center",
                        align: "center",
                        offset: 0,
                        display: true,
                        textAlign: "center",
                    },
                    legend: {
                        display: false, // Hide the default legend
                    },
                    tooltip: {
                        enabled: false,
                    },
                    rtlLegend: {}, // Enable our custom legend plugin
                },
                layout: {
                    padding: {
                        left: 20,
                        right: 20,
                        top: 10,
                        bottom: 10,
                    },
                },
            },
            plugins: [rtlLegendPlugin],
        });
    }

    // Create the legend container if it doesn't exist
    if (!document.getElementById("chartLegendContainer")) {
        const chartContainer = document.querySelector(".chart-container");
        const legendContainer = document.createElement("div");
        legendContainer.id = "chartLegendContainer";
        legendContainer.className = "chart-legend-container";
        chartContainer.appendChild(legendContainer);
    }

    // Create initial chart
    createChart();

    // Handle dropdown change
    const chartFilter = document.getElementById("chartFilter");
    if (chartFilter) {
        chartFilter.addEventListener("change", function () {
            createChart(this.value || "all");
        });
    }

    // Add custom legend styles
    document.head.insertAdjacentHTML(
        "beforeend",
        `
        <style>
            .chart-legend-container {
                width: 45%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding-right: 15px;
            }
            
            .custom-chart-legend {
                list-style: none;
                padding: 0;
                margin: 0;
                direction: rtl;
                text-align: right;
                width: 100%;
            }
            
            .custom-legend-item {
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-bottom: 18px;
                gap: 10px;
            }
            
            .custom-legend-color {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                display: inline-block;
                margin-left: 8px;
            }
            
            .legend-text-container {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 5px;
            }
            
            .custom-legend-label {
                color: #666;
                font-family: 'Qs_Iranyekan';
                font-weight: 500;
                font-size: 14px;
            }
            
            .custom-legend-value {
                color: #666;
                font-family: 'Qs_Iranyekan';
                font-weight: 400;
                font-size: 14px;
                margin-right: 5px;
            }
            
            .chart-container {
                justify-content: space-between;
            }
            
            canvas#projectChart {
                width: 250px !important;
                max-width: 250px !important;
            }
        </style>
    `
    );
});
