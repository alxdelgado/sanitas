import React, { useState, useEffect } from 'react'; 
import { Line } from 'react-chartjs-2';

const options = {
    legend: {
        display: false, 
    }, 
    elements: {
        point: {
            radius: 0, 
       }, 
    },
    mainAspectRatio: false, 
    tooltips: {
        mode: "index", 
        intersect: false, 
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
}; 

function LineGraph() {
    const [data, setData] = useState({});


    const buildChartData = (data, caseType = "cases") => {
        const chartData = []; 
        let lastDataPoint; 

        for (let date in data.cases) {
            if (lastDataPoint) {
                let newDataPoint = {
                    x: date, 
                    y: data[caseType][date] - lastDataPoint
                }
                chartData.push(newDataPoint); 
            }
            lastDataPoint = data[caseType][date];
        }
    }

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response => response.json())
        .then(data => {
            console.log('Line Graph >>> ', data);

            let chartData = buildChartData(data); 
            setData(chartData);

        })

    }, []); 

    return (
        <div>
            <Line 
                data={{ datasets: [{ data: data, backgroundColor: 'rgba(204, 16, 52, 0.5)', borderColor: '#CC1034' }]}}
                options={options}
            />
        </div>
    )
}

export default LineGraph; 
