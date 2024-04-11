import React, { useState } from 'react'

const Login = () => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging you in...', credentials);
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
