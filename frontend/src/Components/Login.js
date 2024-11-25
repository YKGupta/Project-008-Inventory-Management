import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import AlertContext from '../Context/AlertContext';
import ProgressContext from '../Context/ProgressContext';
import UserContext from '../Context/UserContext';

const Login = () => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { alertSetter } = useContext(AlertContext);
    const { setProgress } = useContext(ProgressContext);
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProgress(30);
        try
		{
			const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type":"application/json"
				},
				body: JSON.stringify(credentials)
			});

            setProgress(50);
            
			const json = await response.json();
            
            setProgress(90);
            
			if(json.success)
			{
				alertSetter({ message: json.message, type: "warning"});
                setUser(json.userDetails);
                localStorage.setItem('name', json.userDetails.name);
                localStorage.setItem('token', json.token);
                localStorage.setItem('admin', json.isAdmin.toString());
                navigate('/');
			}
			else
			{
                alertSetter({ message: json.message, type: "danger"});
			}
		}
		catch(error)
		{
			alertSetter({ message: error, type: "danger"});
		}
        finally
        {
            setProgress(100);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='loginContainer blur my-3 background'>
            <form onSubmit={ handleSubmit }>
                <h2 className='text-center'>Login</h2>
                <div>
                    <input type="email" id="email" name='email' onChange={onChange} required placeholder='Email' />
                    <input type="password" id="password" name='password' onChange={onChange} autoComplete='on' required placeholder='Password' />
                </div>
                <button disabled={ credentials.email.trim() === "" || credentials.password.trim().length < 8 } type="submit">Login</button>
            </form>
            <Link to="/signup">I don't have an account. Register?</Link>
        </div>
    )
}

export default Login
