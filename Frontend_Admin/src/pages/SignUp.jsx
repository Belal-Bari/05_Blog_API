import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../assets/styles/SignUp.css';

export const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secret, setSecret] = useState('')
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    
    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:3000/admin-signup', {
            name,
            email,
            password,
            secret
            });
            console.log('User Created');
            navigate('/all-post');
        } catch (error) {
            console.log(error.message);
        }
        
    }
    return (
    <div className="signup-container">
        <h1>Sign Up As Admin</h1>
        {token ? (
        <p>You are already signed in.</p>
        ) : (
        <div>
            <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            }}>
            <label htmlFor='name'>Full Name: </label>
            <input
                type='text'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='John Doe'
                required
            />

            <label htmlFor='email'>Email: </label>
            <input
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='john@test.com'
                required
            />

            <label htmlFor='password'>Password: </label>
            <input
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <label htmlFor='secret'>Enter Secret Key: </label>
            <input
                type='password'
                name='secret'
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                required
            />

            <button type='submit'>Send</button>
            </form>
        </div>
        )}
    </div>
    );

}
