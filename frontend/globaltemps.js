createChart();

async function getData() {
    const x_years = [];
    const y_temps = [];
    const response = await fetch('ZonAnn.Ts+dSST.csv');
    const data = await response.text();

    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const cols = row.split(',');
        const year = cols[0];
        x_years.push(year);
        const temp = cols[1];
        y_temps.push(parseFloat(temp)+14);
        console.log(year, temp);
    });
    
    return {x_years, y_temps};
}

async function createChart() {
    const data = await getData();
    const ctx = document.getElementById('chart');
    
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: data.x_years,
        datasets: [{
            label: 'Combined Land-Surface, Air, and Sea-Surface Water Temperature Anomalies in °C',
            data: data.y_temps,
            borderWidth: 1
        }]
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        callback: function(value, index, values) {
                            return value + "°C";
                        }
                    }
                }
            }
        }
    });
}