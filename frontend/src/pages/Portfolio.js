import React, { useEffect, useState } from 'react'; // Import React hooks for state and side effects
import { Col, Row } from 'react-bootstrap'; // Import Bootstrap components for layout
import { Helmet } from 'react-helmet'; // Import Helmet for managing document head
import axios from 'axios'; // Import axios for making API requests
import WebsiteCard from '../components/WebsiteCard'; // Import the WebsiteCard component for displaying website details
import { getError } from '../utils'; // Import the helper function to format errors

function Portfolio() {
  const [websites, setWebsites] = useState([]); // Define state to store fetched websites
  const [error, setError] = useState(null); // Define state to store any errors

  useEffect(() => {
    const fetchData = async () => {
      // Asynchronous function to fetch website data
      try {
        const { data } = await axios.get('/api/websites'); // Get website data from API endpoint
        setWebsites(data); // Update websites state with fetched data
      } catch (error) {
        setError(getError(error)); // Use getError to format and store the error
      }
    };

    fetchData(); // Call the fetchData function on component mount
  }, []); // Empty dependency array ensures fetchData runs only once

  return (
    <>
      <Helmet>
        <title>Portfolio</title> {/* Set the page title */}
      </Helmet>
      <div className='content'>
        <br />
        {error ? (
          <div>Error fetching data: {error}</div> // Display error message if encountered
        ) : (
          <Row>
            {websites.map((website, index) => (
              <Col md={12} className='box' key={index}>
                {' '}
                {/* Loop through websites and render each with WebsiteCard */}
                <WebsiteCard website={website} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
}

export default Portfolio;
