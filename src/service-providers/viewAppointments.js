import React, { useState, useEffect } from 'react';

function ViewAppointments(){
    const [data, setData] = useState([])
    

    try {
        const response = fetch('http://localhost:3001/api/viewAppointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                businessId, 
            }),
        });

        setData(response.json());
        if(response.ok){
            console.log('Response ok:', data.message);
        }else{
            console.error('Login failed:', data.message);
        }
    }catch (error) {
        console.error('Login failed:', error);
    }
    return(
        <div>
            <h1>View appointment here</h1>
            <table>
                <thead>
                    <th>ID</th>
                    <th>userId</th>
                    <th>businessId</th>
                    <th>appointment start</th>
                    <th>appointment end</th>
                    <th>cancel</th>
                </thead>
                <tbody>
                    {data.map((d, i) => (
                        <tr key = {i}>
                            <td>{d.id}</td>
                            <td>{d.name}</td>
                            <td>{d.email}</td>
                            <td>{d.role}</td>
                            <td><button id="cancelButton">Cancel?</button></td>

                        </tr>
                    ))}
                </tbody>
            </table> 
        </div>
    );

}

export default ViewAppointments;