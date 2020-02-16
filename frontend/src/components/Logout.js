import React from "react";
import Button from "react-bootstrap/Button";

function Home() {
  window.localStorage.setItem("token", "");

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="col-md-12">
          <h1>OK Bye</h1>
          <Button variant="primary" href="/login">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
