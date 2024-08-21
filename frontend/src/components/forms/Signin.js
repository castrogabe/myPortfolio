import Axios from 'axios'; // Importing Axios for making HTTP requests
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importing necessary hooks and components from react-router-dom for navigation and linking
import { Row, Col, Form, Button } from 'react-bootstrap'; // Importing layout and form components from react-bootstrap
import { Helmet } from 'react-helmet'; // Importing Helmet for setting the document head (e.g., title)
import { useContext, useEffect, useState } from 'react'; // Importing React hooks
import { Store } from '../../Store'; // Importing the global state (context) from Store.js
import { toast } from 'react-toastify'; // Importing toast for displaying notifications
import 'react-toastify/dist/ReactToastify.css'; // Importing styles for react-toastify
import { getError } from '../../utils'; // Importing a utility function for error handling
import PropTypes from 'prop-types'; // Importing PropTypes for type-checking

export default function Signin() {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const { search } = useLocation(); // Hook to get the current URL query string
  const redirectInUrl = new URLSearchParams(search).get('redirect'); // Extracting the 'redirect' parameter from the URL
  const redirect = redirectInUrl ? redirectInUrl : '/'; // Setting the redirect URL or defaulting to the homepage

  const [email, setEmail] = useState(''); // State for storing the email input
  const [password, setPassword] = useState(''); // State for storing the password input
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const { state, dispatch: ctxDispatch } = useContext(Store); // Accessing the global state and dispatch function from the context
  const { userInfo } = state; // Extracting userInfo from the global state

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault(); // Preventing the default form submission
    try {
      // Sending a POST request to the backend for user sign-in
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      // Dispatching an action to update the global state with the user info
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      // Storing user info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      // Navigating to the redirect URL or homepage
      navigate(redirect || '/');
    } catch (err) {
      // Displaying an error notification if sign-in fails
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    // Redirecting if the user is already signed in
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]); // Dependencies for the effect

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle showPassword state
  };

  return (
    <div className='content'>
      <Helmet>
        <title>Sign In</title> {/* Setting the page title */}
      </Helmet>
      <br />
      <h1 className='box'>Sign In</h1>
      <Row>
        <Col md={6} className='box'>
          <Form onSubmit={submitHandler}>
            {/* Email input field */}
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                required
                onChange={(e) => setEmail(e.target.value)} // Updating email state
              />
            </Form.Group>

            {/* Password input field with visibility toggle */}
            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <div className='input-group'>
                <Form.Control
                  type={showPassword ? 'text' : 'password'} // Conditionally setting the input type
                  placeholder='Minimum length 8, 1 uppercase, 1 lowercase, 1 digit, and 1 special character'
                  required
                  onChange={(e) => setPassword(e.target.value)} // Updating password state
                />
                <Button
                  variant='outline-secondary'
                  onClick={togglePasswordVisibility} // Toggling password visibility on click
                >
                  <i
                    className={`fa ${
                      showPassword ? 'fas fa-eye-slash' : 'fa-eye'
                    }`}
                  ></i>{' '}
                  {/* Icon for showing/hiding password */}
                </Button>
              </div>
            </Form.Group>

            {/* Sign In button */}
            <div className='mb-3'>
              <Button type='submit'>Sign In</Button>
            </div>

            {/* Link to sign-up page for new customers */}
            <div className='mb-3'>
              New customer?{' '}
              <Link to={`/signup?redirect=${redirect}`} className='my-button'>
                Create your account
              </Link>
            </div>

            {/* Link to password reset page */}
            <div className='mb-3'>
              Forget Password?{' '}
              <Link to={`/forget-password`} className='my-button'>
                Reset Password
              </Link>
            </div>
          </Form>
        </Col>
        {/* Image for the sign-in page */}
        <Col md={6}>
          <img src='/images/signin.png' alt='signin' />
        </Col>
      </Row>
    </div>
  );
}

// Type-checking with PropTypes
Signin.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};
