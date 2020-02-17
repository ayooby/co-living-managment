import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

import { useApi } from "../api";
import { TOKEN } from "../config";
import Loading from "./Loading";

function Login() {
  const [loginForm, setForm] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState({});
  const [{ data, loading, error }, loginHandle] = useApi(
    { url: "/api-token-auth/", method: "POST", data: { ...loginForm } },
    {
      manual: true
    }
  );

  let history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    loginHandle();
  };

  useEffect(() => {
    if (error && error.response) {
      setFormError(error.response.data);
    }
  }, [error]);

  if (loading) {
    return <Loading />;
  }

  if (TOKEN) {
    history.push("/my-lists");
  }

  if (data && data.token.length > 0) {
    window.localStorage.setItem("token", data.token);
    history.go("/my-lists");
    return;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="col-md-5">
          <Card>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              {formError.non_field_errors &&
                formError.non_field_errors.map(e => (
                  <Alert variant="danger">{e}</Alert>
                ))}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    value={loginForm.username}
                    isInvalid={formError.username}
                    onChange={e => {
                      setForm({
                        ...loginForm,
                        username: e.target.value
                      });
                    }}
                    size="lg"
                    type="text"
                    placeholder="Enter Username"
                  />
                  {formError.username &&
                    formError.username.map((e, key) => (
                      <Form.Control.Feedback key={key} type="invalid">
                        {e}
                      </Form.Control.Feedback>
                    ))}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    size="lg"
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    isInvalid={formError.password}
                    onChange={e => {
                      setForm({
                        ...loginForm,
                        password: e.target.value
                      });
                    }}
                  />
                  {formError.password &&
                    formError.password.map((e, key) => (
                      <Form.Control.Feedback key={key} type="invalid">
                        {e}
                      </Form.Control.Feedback>
                    ))}
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
