import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

function Home() {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="col-md-12">
          <Jumbotron>
            <h1>Hello, friend!</h1>
            <p>
                Here, you can update list of every apartment that assigned to you.
                Click on the button and find what you have to do.
            </p>
            <p><strong>If you don't see anything, please ask you supervisor.</strong></p>
            <p>
              <Button variant="primary" href="/my-lists" >See Your List</Button>
            </p>
          </Jumbotron>
        </div>
      </div>
    </div>
  );
}

export default Home;
