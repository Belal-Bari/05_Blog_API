import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './CommentBox.css'; // Import CSS

export const CommentBox = ({ postId }) => {
    const [comment, setComment] = useState('');
    const [commenter, setCommenter] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent default form reload
        try {
            await axios.post(`http://localhost:3000/post-comment/${postId}`, {
                comment: comment,
                commenter: commenter || undefined
            });
            //navigate('/'); // reloads the page
            window.location.reload();
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="comment-box">
            <form onSubmit={handleSubmit}>
                <label htmlFor="comment">Post a comment</label><br />
                <textarea
                    type="text"
                    name="comment"
                    className="comment-input"
                    style={{height: '80px', textWrap:'wrap'}}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment..."
                /><br />

                <label htmlFor="commenter">Your Name:</label><br />
                <input
                    type="text"
                    name="commenter"
                    className="commenter-input"
                    value={commenter}
                    onChange={(e) => setCommenter(e.target.value)}
                    placeholder="Anonymous"
                /><br />

                <button type="submit" className="submit-button">Send</button>
            </form>
        </div>
    );
};
