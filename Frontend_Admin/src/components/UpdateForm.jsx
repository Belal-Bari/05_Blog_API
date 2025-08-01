import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../assets/styles/UpdateForm.css';

export const UpdateForm = ({ post }) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [published, setPublished] = useState(false);

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

    const navigate = useNavigate();

    const handlePost = async (e) => {
        e.preventDefault();
        await axios.put('http://localhost:3000/update-post', {
            id: post.id,
            title,
            content,
            published
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        navigate(0);
    }
    return (
    <div className="update-form">
        <form onSubmit={handlePost}>
        <label htmlFor="title">Title</label>
        <input 
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
        />
        <label htmlFor="content">Content</label>
        <textarea 
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            required
        />
        <div style={{display: 'flex', columnGap: '5px'}}>
            <input
                type="checkbox"
                name="published"
                checked={published}
                onChange={() => setPublished((prev) => !prev)}
            />
            <label htmlFor="published">Publish</label>                  
        </div>
        <button type="submit">Update Post</button>
        </form>
    </div>
    );

}
