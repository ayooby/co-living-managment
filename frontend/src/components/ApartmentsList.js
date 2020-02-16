import React from "react";

import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

import { useApi } from "../api";
import Loading from "./Loading";
import Error from "./Error";
import { TOKEN } from "../config";

function Apartment() {
  const headers = { Authorization: `Token ${TOKEN}` };

  const [{ data, loading, error }] = useApi({
    url: "/api/v1/supplies/",
    headers,
  });

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="col-md-12">
          {data && data.length > 0 ? (
            data.map(list => (
              <div className="col-md-5">
                <Card>
                  <Card.Body>
                    <Card.Title>{list.name}</Card.Title>
                    <Link className="nav-link" to={`apartment/${list.id}/`}>
                      Edit List
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <Alert className="text-center" variant="warning">
              You don't have any list
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default Apartment;
