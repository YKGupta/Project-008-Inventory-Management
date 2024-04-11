import React, { useState } from 'react'

const Signup = () => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Signing you up...', credentials);
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='container my-3'>
            <form onSubmit={ handleSubmit }>
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
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} autoComplete='on' required minLength={ 8 } />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
