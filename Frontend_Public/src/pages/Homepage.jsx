import axios from 'axios';
import { useEffect, useState } from 'react';
import { CommentBox } from '../components/CommentBox';
import '../assets/styles/Homepage.css'; // Import the CSS file

export const Homepage = () => {
    const [data, setData] = useState();
    const [isUpdate, setIsUpdate] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/')
            .then(response => setData(response.data))
            .catch(error => console.log('Axios error:', error));
    }, []);

    useEffect(() => {
        if (data?.posts?.length) {
                setIsUpdate(new Array(data.posts.length).fill(false));
            }
    }, [data]);

    if (!data) return <div className="loading">Loading...</div>;

    return (
        <div className="homepage">
            
            <h1>All Posts</h1>
            <div className="post-list">
                {data.posts && data.posts.length > 0 ? (
                    data.posts.map((post, key) =>
                        post.published ? (
                            <div className="post-card" key={post.id}>
                                
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                <button onClick={() => {
                                    setIsUpdate((prev) => {
                                        const arr = [...prev];
                                        arr[key] = !arr[key];
                                        return arr
                                    })
                                }}>Post a Comment</button>
                                {isUpdate[key]? <CommentBox postId={post.id} /> : null}
                                

                                <div className="comments-section">
                                    <h5>Comments</h5>
                                    {post.comments && post.comments.length > 0 ? (
                                        post.comments.map((comment, i) => (
                                            <div key={i} className="comment">
                                                <h6>{comment.commenter || 'Anonymous'}</h6>
                                                <p>{comment.content}</p>
                                                <small>Posted at: {new Date(comment.createdAt).toLocaleString()}</small>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No Comments.</p>
                                    )}
                                </div>

                                <p className="status">{post.published ? 'Published' : 'Not Published'}</p>
                                <p><strong>Author:</strong> {post.author?.name}</p>
                                <p className="timestamps">
                                    Created: {new Date(post.createdAt).toLocaleString()}<br />
                                    Updated: {new Date(post.updatedAt).toLocaleString()}
                                </p>
                            </div>
                        ) : null
                    )
                ) : (
                    <p>No Posts yet.</p>
                )}
            </div>
        </div>
    );
};
