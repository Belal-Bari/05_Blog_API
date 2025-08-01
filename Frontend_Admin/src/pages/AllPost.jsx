import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SignOutButton from '../components/SignoutButton';
import { UpdateForm } from '../components/UpdateForm';
import '../assets/styles/AllPost.css';

export const AllPost = () => {
    const [data, setData] = useState();
    const [isUpdate, setIsUpdate] = useState([]);
    const [user, setUser] = useState('')
    
    const navigate = useNavigate();

    //-----------Check token expiration-------------//
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
        localStorage.removeItem('token');
        console.log('Token expired and removed.');
        
        
    }
    useEffect(() => {
        if(token){
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser(() => payload.email)
            //console.log("Updated user:", user);
        }
        }, [user]);
    function isTokenExpired(token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            //console.log(payload.email)
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp < currentTime;
        } catch (err) {
            return true;
        }
    }
    //-----------^^^^^^^^^^^^^^^^^^^^^^^-------------//

    useEffect(() => {
        axios.get('http://localhost:3000/')
            .then(response => setData(response.data))
            .catch(error => console.log('Axios error:', error));
    },[])

    useEffect(() => {
        if (data?.posts?.length) {
            setIsUpdate(new Array(data.posts.length).fill(false));
        }
    }, [data]);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/delete-post/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .catch((error) => console.log(error.message));
        navigate(0);
    };

    const handleDeleteComment = async (id) => {
        await axios.delete(`http://localhost:3000/delete-comment/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        navigate(0);
    };

    if (!data) return <div>Loading...</div>
    return (
    <div className="all-post-container">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1>All Post</h1>
            <SignOutButton admin={user} />
        </div>
        
        {token ? (
        <div>
            <Link to="/add-post">Add post</Link>
            
            <div style={{borderBottom: '1px solid lightGrey', height: '15px', marginBottom: '15px'}}></div>
            {data.posts ? (
            data.posts.map((post, key) => (
                <div key={key} className="post-card">
                <h4>Title: {post.title}</h4>
                <p>{post.content}</p>
                <h5>Comments</h5>
                {post.comments && post.comments.length > 0 ? (
                    <div className="comment-section">
                    {post.comments.map((comment) => (
                        <div key={comment.id} className="comment">
                        <h5>{comment.commenter}</h5>
                        <p>{comment.content}</p>
                        <small>Posted at: {comment.createdAt}</small><br/>
                        <button onClick={() => handleDeleteComment(comment.id)}>
                            Delete Comment
                        </button>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p>No Comments.</p>
                )}
                <p>{post.published ? '✅ Published' : '🚫 Not published'}</p>
                <p>Author: {post.author.name}</p>
                <p>
                    Created at: {post.createdAt}
                    <br />
                    Updated at: {post.updatedAt}
                </p>
                {isUpdate[key] ? (
                    <UpdateForm post={post} />
                ) : (
                    <button
                    onClick={() =>
                        setIsUpdate((prev) => {
                        const updated = [...prev];
                        updated[key] = true;
                        return updated;
                        })
                    }
                    >
                    Update
                    </button>
                )}
                <button style={{marginLeft: '5px'}} onClick={() => handleDelete(post.id)}>
                    Delete Post
                </button>
                </div>
            ))
            ) : (
            <p>No Posts yet.</p>
            )}
        </div>
        ) : (
        <p>You are not Signed in.<Link to="/">Sign in here.</Link></p>
        )}
        
    </div>
    );

}
