import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap'; // Import components from React Bootstrap

function WebsiteCard({ website }) {
  // Define a functional component "WebsiteCard" that accepts "website" as props
  return (
    <Card>
      <Row noGutters>
        <Col md={6}>
          <Card.Img // Display website image
            src={website.image}
            alt={website.name} // Provide alternative text for accessibility
            loading='lazy' // Optimize image loading for performance
            className='card-img-left' // Apply styling for left-aligned image
          />
        </Col>
        <Col md={6}>
          <Card.Body>
            <Card.Title>{website.name}</Card.Title> // Display website name
            <Card.Text>{website.languageDescription}</Card.Text> // Display
            website language description
            <Card.Text>{website.description}</Card.Text> // Display website
            description
            <Button // Create a button to link to the website
              href={website.link}
              target='_blank' // Open link in a new tab
              rel='noopener noreferrer' // Add security attributes for external links
              variant='primary' // Apply Bootstrap's "primary" button style
            >
              Visit Website
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default WebsiteCard; // Export the "WebsiteCard" component for reuse
