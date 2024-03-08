/*
This Document will show all the users in a list for the admins to see
*/
import React, { useState, useEffect } from 'react';
import '../common/styles/UsersListPage.css';
//import {Link, useParams, useLocation, useNavigate} from 'react-router-dom';

function UsersList(){
    const [data, setData] = useState([])
    const [filterRole, setFilterRole] = useState(""); // State to hold the selected role filter
    const [filteredData, setFilteredData] = useState([]); // State to hold the filtered data


    useEffect(() => {
        fetch('http://localhost:3001/api/users')
        .then(res => res.json())
        .then(data => {setData(data); setFilteredData(data);})
        .catch(err => console.log(err));
    }, [])

    const ClickFunction = async (id, active) => { 
        // Implement logic to activate/deactivate user with id
        // You can use fetch or any other method to make an API call
        
        // Example of setting active to 1 or 0 based on its current value
        const newActive = active === 1 ? 0 : 1;
        console.log(`User ID: ${id} - Active: ${newActive}`);
        try {
            const response = await fetch('http://localhost:3001/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newActive                    
                }),
            });

            /*const data = await response.json();
            if(response.ok){
                console.log('Response ok:', data.message);
                login(data);
                if (role === 'service-provider') {
                    navigate('/service-providers/ServiceDashBoard'); // brings the service provider to the service provider dashboard
                } else if (role === 'user') {
                    navigate('/users/userDashboard'); // bring the user to the user dashboard 
                }
            }else{
                console.error('Login failed:', data.message);
                errorMsg.innerHTML = "Login failed";
            }*/
        }catch (error) {
            console.error('Login failed:', error);
        }
    };
    //const filteredData = filterRole ? data.filter(d => d.role === filterRole) : data;
    // Update filteredData state when filterRole changes
    useEffect(() => {
        if (filterRole) {
            setFilteredData(data.filter(d => d.role === filterRole));
        } else {
            setFilteredData(data);
        }
    }, [data, filterRole]);
    return ( // html for the page
        <div >
            <div id="errorMessage">Error</div>
            <select onChange={(e) => setFilterRole(e.target.value)}>
                <option value="">All Roles</option>
                <option value="user">User</option>
                <option value="service-provider">Service Provider</option>
            </select>
            <table>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>User Type</th>
                    <th>Activate/Deactivate User</th>
                </thead>
                <tbody>
                    {filteredData.map((d, i) => (
                        <tr key = {i}>
                            <td>{d.id}</td>
                            <td>{d.name}</td>
                            <td>{d.email}</td>
                            <td>{d.role}</td>
                            <td><button id="activateButton" className={d.active === 1 ? 'Active' : 'Deactive'} onClick={() => ClickFunction(d.id, d.active)}>{d.active === 1 ? 'Active' : 'Deactive'}</button></td>

                        </tr>
                    ))}
                </tbody>
            </table> 
        </div>
    ) 
}

export default UsersList;