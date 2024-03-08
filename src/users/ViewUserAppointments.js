/*
This Document will show users their appoitnments
*/
import React, { useState, useEffect } from 'react';
//import {useAuth} from '../Authenticator';
import './ViewUsersApp.css';

function ViewUserAppointments(){
    const [data, setData] = useState([])


    useEffect(() => {   //query for the user appoitment data 
        fetch('http://localhost:3001/api/viewUserAppointments')
        .then(res => res.json())
        .then(data => {setData(data);})
        .catch(err => console.log(err));
    }, [])

    console.log(data);

    /*const {user} = useAuth();
    const userId = user;
    console.log("user ", user);
    console.log(userId);

    try {
        const response = fetch('http://localhost:3001/api/viewUserAppointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId, 
            }),
        });
        console.log(response);
        setData(response.json());
        if(response.ok){
            console.log('Response ok:', data.message);
        }else{
            console.error('Login failed:', data.message);
        }
    }catch (error) {
        console.error('Login failed:', error);
    }*/
    return( // html for the page
        <div>
            <h1>View appointment here</h1>
            <table>
                <thead>
                    <th>ID</th>
                    <th>userId</th>
                    <th>businessId</th>
                    <th>appointment start</th>
                    <th>appointment end</th>
                    <th>Purpose</th>
                    <th>cancel</th>
                </thead>
                <tbody>
                    {data.map((d, i) => (
                        <tr key = {i}>
                            <td>{d.id}</td>
                            <td>{d.userId}</td>
                            <td>{d.businessId}</td>
                            <td>{d.appointmentStart}</td>
                            <td>{d.appointmentEnd}</td>
                            <td>{d.Purpose}</td>
                            <td><button id="cancelButton" className='Deactive'>Cancel?</button></td>

                        </tr>
                    ))}
                </tbody>
            </table> 
        </div>
    );

}

export default ViewUserAppointments;