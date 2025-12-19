import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardTitle
} from 'reactstrap';
import httpInjectorService from '../../services/http-injector.service';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log('Submitting login form with:', { email, password });
  try{
    const response = await httpInjectorService.loginUser({ email, password });
    if(response.status === 'success'){
      
      localStorage.setItem('token', '123');
      localStorage.setItem('user', email);
      localStorage.setItem('userId', response.data.user_id );
      navigate('/dashboard')
      // alert('Login Successful');
      console.log('Login Successful');
    }
    else{
      console.log('Login Failed: ', response.message);
    }
  }
  catch(error){
    console.error('Error during login:', error);
  }
}

  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow-sm">
            <CardBody>
              <CardTitle tag="h4" className="text-center mb-4">
                Login
              </CardTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </FormGroup>
                <Button color="primary" block type="submit">
                  Sign In
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;