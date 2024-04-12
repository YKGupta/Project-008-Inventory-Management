import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

	const host = "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Signing you up...', credentials);
        try 
        {
            const response = await fetch(`${host}/api/auth/adduser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            const json = await response.json();

            if (json.success) {
                alert(json.message);
                localStorage.setItem('token', json.token);
                navigate('/');
            }
            else {
                alert(json.message);
            }
        }
        catch (error) {
            alert(error);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='container my-3'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" name='name' onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} autoComplete='on' required minLength={8} />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
