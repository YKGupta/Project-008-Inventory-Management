import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

	const host = "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Logging you in...', credentials);
        try
		{
			const response = await fetch(`${host}/api/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type":"application/json"
				},
				body: JSON.stringify(credentials)
			});

			const json = await response.json();

			if(json.success)
			{
				alert(json.message);
                localStorage.setItem('token', json.token);
                navigate('/');
			}
			else
			{
				alert(json.message);
			}
		}
		catch(error)
		{
			alert(error);
		}
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='container my-3'>
            <form onSubmit={ handleSubmit }>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} autoComplete='on' required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
