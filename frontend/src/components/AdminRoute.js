import React, { useContext } from 'react'; // Importing React and the useContext hook
import { Navigate } from 'react-router-dom'; // Importing Navigate from react-router-dom to redirect users
import { Store } from '../Store'; // Importing the global state (context) from Store.js

// Component to protect routes that require admin access
export default function AdminRoute({ children }) {
  const { state } = useContext(Store); // Accessing the global state using useContext
  const { userInfo } = state; // Extracting userInfo from the global state

  // If the user is logged in and is an admin, render the child components
  // Otherwise, redirect to the sign-in page
  return userInfo && userInfo.isAdmin ? children : <Navigate to='/signin' />;
}
