import React from "react";

import Alert from "react-bootstrap/Alert";

function Error({error}) {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="row">
            <Alert className="text-center" variant="danger">
                Something went wrong
                <br />
                {error}
            </Alert>
        </div>
      </div>
    </div>
  );
}

export default Error;
