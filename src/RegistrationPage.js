import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './Registration.css';
function RegistrationPage (){
    const [showRegistration, setShowRegistration] = useState(false);
    const [regName, setName] = useState('');
    const [regEmail, setEmail] = useState('');
    const [regPassword, setPassword] = useState('');
    const [regConfirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        //reg logic goes here
        console.log("Reg: ", regName, regEmail, regPassword, regConfirmPassword);
        //send data to the backend
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