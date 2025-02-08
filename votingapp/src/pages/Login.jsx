import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/formContainer.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import { useLoginMutation } from "../slices/usersApiSlice";
// import { setCredentials } from "../slices/authSlice";
// import { toast } from "react-toastify";
import Loader from "../components/loader.jsx";
import useLogin from "../hooks/useLogin.jsx";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (e) {
      console.log("MESSAGE", e.message);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type="submit"
          variant="primary"
          className="mt-3"
        >
          Sign In
        </Button>
      </Form>

      {isLoading && <Loader />}

      <Row className="py-3">
        <Col>
          New User? <NavLink to="/register">Register</NavLink>
        </Col>
      </Row>
      {error && (
        <Row className="py-3">
          <Col>{error}</Col>
        </Row>
      )}
    </FormContainer>
  );
};

export default LoginScreen;
