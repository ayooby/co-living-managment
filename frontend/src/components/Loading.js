import React from "react";

import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="row">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      </div>
    </div>
  );
}

export default Loading;
