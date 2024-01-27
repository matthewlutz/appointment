import React, { useState } from 'react';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Login logic
        console.log('Username:', username, 'Password:', password);
        // After login logic 
    };

    return (
        <div className = "login-container">
            <div className = "login-card">
                <h2>Login</h2>
                <form className="login-form" onSubmit = {handleSubmit}>
                    <div>
                        <label>
                            Username:
                            <input
                                type = "text"
                                value = {username}
                                onChange={(e) => setUsername(e.target.value)} 
                                className="login-input"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:
                            <input
                                value={username}
                                onChange={(e)=> setPassword(e.target.value)}
                                className="login-input"
                            />
                        </label>
                    </div>
                    <div>
                        <button type="submit" className = "login-button">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;