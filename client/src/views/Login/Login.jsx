import React, { Fragment, useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { loginUser } from "../../slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DASHBOARD } from "../../constants/routes";
import { setAlert } from "../../slices/alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "")
      dispatch(setAlert("Fill the details properly!", "error"));
    else {
      dispatch(loginUser({ email, password }));
      setEmail("");
      setPassword("");
    }
  };
  const {
    loading,
    auth: { isAuthenticated },
  } = useSelector((state) => {
    return {
      loading: state.loading.loading,
      auth: state.auth,
    };
  });

  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
      history.push(DASHBOARD);
    }
  }, [isAuthenticated, history]);
  return (
    <Fragment>
      <h3 style={{ marginBottom: "2rem", fontWeight: "bold" }}>LOGIN</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button
          style={{ width: "100px", marginTop: "1rem" }}
          onClick={onSubmit}
          variant="primary"
          type="submit"
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Login"}
        </Button>
      </Form>
    </Fragment>
  );
};

export default Login;
