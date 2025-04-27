// src/components/Navbar.tsx
import React from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context';

const CustomNavbar: React.FC = () => {
  const { isAuthenticated, logout, isAdmin } = useAuth(); // Destructure state from context

  const navigate = useNavigate(); 
  const handleLogout = () => {
    logout(); // Perform logout
    navigate('/'); // Navigate to the home page ("/")
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      {/* Navbar Brand with slight padding */}
      <Navbar.Brand className='m-3 pr-3' href="#">My Mood</Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="w-100 d-flex justify-content-between">
          <Nav.Item className='m-3'>
            {isAuthenticated && (
              <Link to="/moodEntry" className="text-light text-decoration-none">
                Submit Mood
              </Link>
            )}
          </Nav.Item>

          <Nav.Item className="m-2">
              {isAuthenticated && isAdmin && (
                <NavDropdown title={<span className="text-light">Mood Ratings</span>} id="mood-ratings-dropdown" className="text-light">
                  <NavDropdown.Item as={Link} to="/dailyMoodRating">
                    Daily Rating
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/weeklyMoodRating">
                    Weekly
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/monthlyMoodRating">
                    Monthly
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav.Item>

          {/* Right side - Login/Logout */}
          <Nav.Item className="ms-auto">
            {!isAuthenticated ? (
              <Link to="/login" className="text-light text-decoration-none">
                Login
              </Link>
            ) : (
              <Button variant="dark" className='m-2' onClick={handleLogout}>
                Logout
              </Button>              
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
