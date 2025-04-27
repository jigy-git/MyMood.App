import React from 'react';
import { useAuth } from '../../contexts/auth.context';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Container
        className="text-center"
        style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
      <h1>Welcome to MyMood App</h1>
      {isAuthenticated ? (
        <p><Link to="/moodEntry">Click here</Link> to tell us how you feel today ...</p>
      ) : (
        <p>Please log in to continue.</p>
      )}      
    </Container>
  );
};

export default Home;
