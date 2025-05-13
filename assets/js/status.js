document.addEventListener('DOMContentLoaded', function () {
    // ثبت افزونه datalabels
    Chart.register(ChartDataLabels);

    const ctx = document.getElementById('projectChart').getContext('2d');
    const projectChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [
                {
                    data: [15, 35, 21, 29],
                    backgroundColor: ['#36a2eb','#ffcd56' , '#4bc0c0','#ff6384'  ],
                    hoverOffset: 4,
                },
            ],
            labels: ['تعیین محدوده:', 'نقشه برداری ', 'پروژه های در دست اقدام', 'پروژه های پایان یافته'],
        },
        options: {
            responsive: true,
            // maintainAspectRatio: false,
            cutout:150,
            plugins: {

                datalabels: {
                    formatter: (value) => {
                        return value + '%';
                    },
                    color: '#fff',
                    font: {
                        weight: 'bold',
                    },

                },
                legend: {
                    position: 'top',
                },
              
            }
        }
    });
});