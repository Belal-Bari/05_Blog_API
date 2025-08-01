import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/AddPost.css'; // CSS file

export const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(false);
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

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/admin-create-post', {
                title,
                content,
                published
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/all-post');
        } catch (error) {
            console.log('Axios Error:', error.response?.data || error.message);
        }
    };

    return (
        <div className="add-post-container">
            <h1>Add Post</h1>
            {token ? (
                <div className="form-wrapper">
                    <form onSubmit={handlePost} className="add-post-form">
                        <label htmlFor='title'>Title</label>
                        <input 
                            type='text'
                            id='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Title'
                            required
                        />

                        <label htmlFor='content'>Content</label>
                        <textarea
                            id='content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder='Content'
                            required
                        />

                        <label htmlFor='published'>
                            <input
                                type='checkbox'
                                id='published'
                                checked={published}
                                onChange={() => setPublished(prev => !prev)}
                            />
                            {' '}Publish
                        </label>

                        <button type='submit'>Add Post</button>
                    </form>
                    <Link to="/all-post" className="link-button">View All Posts</Link>
                </div>
            ) : (
                <div>
                    <p>You are not signed in.</p>
                    <Link to='/'>Sign in</Link>
                </div>
            )}
        </div>
    );
};
