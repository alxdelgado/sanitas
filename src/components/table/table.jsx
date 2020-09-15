import React from 'react'

import './table.css';

function Table({ countries }) {
    console.log("TABLE COMPONENT >>>>", countries);

    return (
        <div className="table">
            {countries.map(({ country, cases }) => (
                <div key={country}>
                    <td>{country}</td>
                    <td>
                        <strong>{cases}</strong>
                    </td>
                </div>
            ))}
        </div>
    )
} 

export default Table;
