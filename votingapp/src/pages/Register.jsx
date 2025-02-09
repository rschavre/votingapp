import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/formContainer.jsx";
import Loader from "../components/loader.jsx";
import useRegister from "../hooks/useRegister.jsx";

const RegisterScreen = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, errorReg, isLoading } = useRegister();
  const navigate = useNavigate();

  useEffect(() => {
    if (errorReg) {
      setError(errorReg);
    }
  }, [errorReg]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const isSuccess = await register(email, password);

    if (isSuccess) {
      navigate("/login"); // Navigate only if registration was successful
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          disabled={isLoading}
          type="submit"
          variant="primary"
          className="mt-3"
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </Form>

      {isLoading && <Loader />}

      {error && (
        <Row className="py-3">
          <Col className="text-danger">{error}</Col>
        </Row>
      )}

      <Row className="py-3">
        <Col>
          Already a User? <NavLink to="/login">Login</NavLink>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
