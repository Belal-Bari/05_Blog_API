import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/styles/Home.css';

export const Home = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate();

    //-----------Check token expiration-------------//
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
        localStorage.removeItem('token');
        console.log('Token expired and removed.');
    }
    function isTokenExpired(token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp < currentTime;
        } catch (err) {
            return true;
        }
    }
    //-----------^^^^^^^^^^^^^^^^^^^^^^^-------------//

    useEffect(()=> {
        
        if (token) setIsLoggedIn(true)
    },[])

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/admin-signin', {
                email,
                password
            },);//message, token, id
            console.log(response);
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/all-post')
        } catch (error) {
            console.log(error);
            alert('Login failed!');
        }
    }
    
    return (
    <div className="home-container">
        <h1>Admin Panel Home</h1>
        <h2>Blog Website</h2>
        <h3>Sign In</h3>
        {isLoggedIn ? (
        <div>
            <p>You are already signed in.</p>
            <Link to={'/all-post'}>View All Posts</Link><br />
            <Link to={'/add-post'}>Create new Post</Link>
        </div>
        ) : (
        <div>
            <form onSubmit={handleSignin}>
            <label htmlFor='email'>Enter Email:</label>
            <input
                type="email"
                name='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label htmlFor='password'>Enter Password:</label>
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Sign In</button>
            </form>
            <p>Sign up as <Link to={'/signup'}>admin</Link>.</p>
        </div>
        )}
    </div>
    );

}
