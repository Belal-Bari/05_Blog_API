import { useNavigate } from 'react-router-dom';
import '../assets/styles/SignOutButton.css';

const SignOutButton = ({ admin }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove JWT token
    // Optionally reset any user state here or context
    navigate(0); // Redirect to login or home page
  };

  return (
    <button className="signout-button" onClick={handleSignOut}>
      Sign Out ({admin})
    </button>
  );

};

export default SignOutButton;
