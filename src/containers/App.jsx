import React, { useState, useEffect } from 'react';

// Import regenerator runtime; 
import regeneratorRuntime from "regenerator-runtime";

// import components; 
import InfoBox from '../components/info-box/info-box.jsx';
import Map from '../components/maps/map';
import Table from '../components/table/table.jsx';
import { sortData } from '../utils.js';
import LineGraph from '../LineGraph.js';



// import material-ui components; 
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';

// import styles;
import './App.css'; 

export default function App() {

    // init state; 
    const [countries, setCountries] = useState([]);
    const [country, setInputCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [casesType, setCasesType] = useState("cases");
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);

    // useEffect cycle grabbing all data;
    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/all')
        .then(response => response.json())
        .then(data => {
            setCountryInfo(data);
        })
    }, []);

    // useEffect cycle grabbing the country data;
    useEffect(() => {
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
                // restructure the data tree that you are getting from the api
                const countries = data.map((country) => ({
                    name: country.country, 
                    value: country.countryInfo.iso2 // UK, USA FR
                }));

                const sortedData = sortData(data);
                setTableData(sortedData);
                setMapCountries(data);
                setCountries(countries);
            });
        }; 

        getCountriesData();
    }, []);

    console.log(casesType);

    // onchange method; 
    const onCountryChange = async (event) => {
        const countryCode = event.target.value;

        const url = 
            countryCode === 'worldwide' 
                ? 'https://disease.sh/v3/covid-19/all' 
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setInputCountry(countryCode);
                setCountryInfo(data);
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]); 
                setMapZoom(4);
        })
    }; 

    console.log("COUNTRY INFO >>>>>", countryInfo);


    return (
        // App Main Container
        <div className="app">
            {/* App Left */}
           <div className="app_left">
                <div className="app_header">
                    <h1>COVID-19 Tracker</h1>
                    <FormControl className="app_dropdown">
                        <Select variant="outlined" value={country} onChange={onCountryChange}>
                            {/* loop through all the countries and list all countries*/}
                            <MenuItem value="worldwide"></MenuItem>
                            {countries.map((country) => (
                                <MenuItem value={country.value}>{country.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="app_stats">
                    <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
                    <InfoBox title="Recovered" cases={countryInfo.todayCases} total={countryInfo.cases}/>
                    <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
                </div>
                 <Map center={mapCenter} zoom={mapZoom} countries={mapCountries} casesType={casesType} />
            </div>
    
            {/* App Right */}
            <Card className="app_right">
                <CardContent>
                    <div className="app_information">
                        <h3>Live Cases by Country</h3>
                        <Table countries={tableData} />
                        <h3>Worldwide new cases</h3>
                        <LineGraph casesType={casesType} />
                    </div>
                </CardContent>

            </Card>
        
        </div>
    )
}