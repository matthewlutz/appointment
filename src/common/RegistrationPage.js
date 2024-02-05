import React, {useState} from 'react';
import {Link, useNavigate, useLocation} from "react-router-dom";
import './styles/Registration.css';


function RegistrationPage (){
    const [showRegistration, setShowRegistration] = useState(false);
    const [regName, setName] = useState('');
    const [regEmail, setEmail] = useState('');
    const [regPassword, setPassword] = useState('');
    const [regConfirmPassword, setConfirmPassword] = useState('');
    const location = useLocation();
    const [role, setRole] = useState(location.state?.role || 'user'); 
    const navigate = useNavigate();

    const emailRegex = /\S+@\S+\.\S+/ // email validation regex
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //password validation regex

    //validates the user entered valid forms of email and password
    const validateForm = () => {
        if (!emailRegex.test(regEmail)) {
            alert('Invalid email');
            return false;
        }else if (!passwordRegex.test(regPassword)) {
            alert('Password must contain at least 8 characters, including 1 letter and 1 number');
            return false;
        }if (regPassword !== regConfirmPassword) {
            alert('Passwords do not match');
            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(!validateForm()) return;
        
        const userData = {
            name: regName,
            email: regEmail,
            password: regPassword,
            confirmPassword: regConfirmPassword,
            role,
        }
        try{
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            if(response.ok){
                console.log(data.message + ' ' + data.role);
                if(role === 'service-provider'){
                    navigate('/service-providers/BusinessDetailsForm');
                }else if (role === 'user'){
                    //navigate('/login');
                }
            }else{
                console.log(data.message);
            }
        }catch (error){
            console.log('Registration failed');
        }
    }

    return (
        <div className="registration-container">
            <div className="registration-card">
                <h2>Register</h2>
                <form className="registration-form" onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={regName}
                                onChange={(e) => setName(e.target.value)}
                                className="registration-input"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Email:
                            
                            <input
                                type="email"
                                value={regEmail}
                                onChange={(e) => setEmail(e.target.value)}
                                className="registration-input"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:
                            <input
                                type="password"
                                value={regPassword}
                                onChange={(e) => setPassword(e.target.value)}
                                className="registration-input"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Confirm Password:
                            <input
                                type="password"
                                value={regConfirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="registration-input"
                            />
                        </label>
                    </div>
                    <div>
                        <button type="submit" className="registration-button">Register</button>
                    </div>
                </form>
                <div className="login-link">
                    <Link to="/login">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage