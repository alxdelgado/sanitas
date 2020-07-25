import React, { useState, useEffect } from 'react'; 
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

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
    scales: {
        xAxes: [
            {
                type: "time", 
                time: {
                    format: "MM/DD/YY", 
                    tooltipFormat: "ll", 
                }, 
            }, 
        ], 
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    }
}; 


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
    return chartData;
}

function LineGraph() {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => response.json())
            .then(data => {
                console.log('Line Graph >>> ', data);

                let chartData = buildChartData(data, "cases"); 
                setData(chartData);
            }); 
        }
        fetchData(); 
    }, []); 

    // I'm using optional chaining in the condition to return the linegraph component. >>> {data?.length etc...} <<< 
    // could also be written as so: {data && data.length etc...}
    return (
        <div>
            {data?.length > 0 && (
                <Line 
                    data={{ datasets: [{ data: data, backgroundColor: 'rgba(204, 16, 52, 0.5)', borderColor: '#CC1034' }]}}
                    options={options}
                />
            )}
        </div>
    )
}

export default LineGraph; 