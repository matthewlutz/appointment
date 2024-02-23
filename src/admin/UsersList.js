import React, { useState, useEffect } from 'react';
import '../common/styles/UsersListPage.css';
//import {Link, useParams, useLocation, useNavigate} from 'react-router-dom';

function UsersList(){
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/api/users')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, [])
    return (
        <div >
            <table>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>User Type</th>
                </thead>
                <tbody>
                    {data.map((d, i) => (
                        <tr key = {i}>
                            <td>{d.id}</td>
                            <td>{d.name}</td>
                            <td>{d.email}</td>
                            <td>{d.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table> 
        </div>
    ) 
}

export default UsersList