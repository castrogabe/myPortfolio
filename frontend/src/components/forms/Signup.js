import Axios from 'axios'; // Importing Axios for making HTTP requests
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importing necessary hooks and components from react-router-dom for navigation and linking
import { Row, Col, Button, Form } from 'react-bootstrap'; // Importing layout and form components from react-bootstrap
import { Helmet } from 'react-helmet'; // Importing Helmet for setting the document head (e.g., title)
import { useContext, useEffect, useState } from 'react'; // Importing React hooks
import { Store } from '../../Store'; // Importing the global state (context) from Store.js
import { toast } from 'react-toastify'; // Importing toast for displaying notifications
import { getError } from '../../utils'; // Importing a utility function for error handling

export default function Signup() {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const { search } = useLocation(); // Hook to get the current URL query string
  const redirectInUrl = new URLSearchParams(search).get('redirect'); // Extracting the 'redirect' parameter from the URL
  const redirect = redirectInUrl ? redirectInUrl : '/'; // Setting the redirect URL or defaulting to the homepage

  const [name, setName] = useState(''); // State for storing the name input
  const [email, setEmail] = useState(''); // State for storing the email input
  const [password, setPassword] = useState(''); // State for storing the password input
  const [confirmPassword, setConfirmPassword] = useState(''); // State for storing the confirm password input
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility

  const { state, dispatch: ctxDispatch } = useContext(Store); // Accessing the global state and dispatch function from the context
  const { userInfo } = state; // Extracting userInfo from the global state

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault(); // Preventing the default form submission
    if (password !== confirmPassword) {
      toast.error('Passwords do not match'); // Displaying an error if passwords don't match
      return;
    }
    try {
      // Sending a POST request to the backend for user sign-up
      const { data } = await Axios.post('/api/users/signup', {
        name,
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
      // Displaying an error notification if sign-up fails
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

  // Function to toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle showConfirmPassword state
  };

  return (
    <div className='content'>
      <Helmet>
        <title>Sign Up</title> {/* Setting the page title */}
      </Helmet>
      <br />
      <Row>
        <h4 className='box'>Sign Up</h4>
        <Col md={6}>
          <Form onSubmit={submitHandler} className='box'>
            {/* Name input field */}
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)} // Updating name state
                required
              />
            </Form.Group>

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
                  placeholder='Enter your password'
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

            {/* Confirm Password input field with visibility toggle */}
            <Form.Group className='mb-3' controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <div className='input-group'>
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'} // Conditionally setting the input type
                  placeholder='Confirm your password'
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)} // Updating confirmPassword state
                />
                <Button
                  variant='outline-secondary'
                  onClick={toggleConfirmPasswordVisibility} // Toggling confirm password visibility on click
                >
                  <i
                    className={`fa ${
                      showConfirmPassword ? 'fas fa-eye-slash' : 'fa-eye'
                    }`}
                  ></i>{' '}
                  {/* Icon for showing/hiding confirm password */}
                </Button>
              </div>
            </Form.Group>

            {/* Sign Up button */}
            <div className='mb-3'>
              <Button type='submit'>Sign Up</Button>
            </div>

            {/* Link to sign-in page if the user already has an account */}
            <div className='mb-3'>
              Already have an account?{' '}
              <Link to={`/signin?redirect=${redirect}`} className='my-button'>
                Sign In
              </Link>
            </div>
          </Form>
        </Col>

        {/* Image for the sign-up page */}
        <Col md={6} className='mt-3'>
          <img
            src='/images/register.png'
            alt='register'
            className='img-fluid'
          />
        </Col>
      </Row>
    </div>
  );
}
