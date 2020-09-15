import React from 'react'; 
import numeral from 'numeral';

import './table.css';

function Table({ countries }) {
    console.log("TABLE COMPONENT >>>>", countries);

    return (
        <div className="table">
            {countries.map(({ country, cases }) => (
                <div key={country}>
                    <td>{country}</td>
                    <td>
                        <strong>{numeral(cases).format("0,")}</strong>
                    </td>
                </div>
            ))}
        </div>
    )
} 

export default Table;
