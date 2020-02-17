import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Loading from "./Loading";
import { useApi } from "../api";
import { TOKEN } from "../config";

function Signup() {
  const [signupForm, setForm] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState({});
  let history = useHistory();

  const [{ data, loading, error }, signupHandle] = useApi(
    { url: "/api/v1/users/", method: "POST", data: { ...signupForm } },
    {
      manual: true
    }
  );

  useEffect(() => {
    if (error && error.response) {
      setFormError(error.response.data);
    }
  }, [error]);

  const handleSubmit = e => {
    e.preventDefault();
    signupHandle();
  };

  if (loading) {
    return <Loading />;
  }

  if (TOKEN) {
    history.push("/my-lists");
  }

  if (data && data.auth_token.length > 0) {
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
              <Card.Title>Signup</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    size="lg"
                    type="text"
                    value={signupForm.username}
                    isInvalid={formError.username}
                    onChange={e => {
                      setForm({
                        ...signupForm,
                        username: e.target.value
                      });
                    }}
                    placeholder="Enter username"
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
                    isInvalid={formError.password}
                    onChange={e => {
                      setForm({
                        ...signupForm,
                        password: e.target.value
                      });
                    }}
                    value={signupForm.password}
                  />
                  {formError.password &&
                    formError.password.map((e, key) => (
                      <Form.Control.Feedback key={key} type="invalid">
                        {e}
                      </Form.Control.Feedback>
                    ))}
                </Form.Group>
                <Button variant="primary" type="submit">
                  Sign me up!
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Signup;
