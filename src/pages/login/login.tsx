import React, { useState } from 'react';
import { useAuth } from '../../contexts/auth.context';
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();  // Initialize navigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      // Redirect to the mood entry page if login is successful
      navigate('/moodEntry');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container fluid style={{ height: '90vh' }}>
      <Row className="justify-content-center align-items-center w-100" style={{ height: '80%' }}>
        <Col xs={12} md={6} lg={4}> {/* This controls the size of the form container */}
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column xs={4}>Email</Form.Label>
              <Col xs={8}>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column xs={4}>Password</Form.Label>
              <Col xs={8}>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </Col>
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
