import React from "react";

import { useParams, Link } from "react-router-dom";

import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

import Loading from "./Loading";
import Error from "./Error";
import { TOKEN } from "../config";
import { useApi } from "../api";
import ApartmentTable from "./ApartmentTable";

function Apartment() {
  const { id } = useParams();

  const headers = { Authorization: `Token ${TOKEN}` };
  const url = `/api/v1/supplies/${id}/`;
  const [{ data, loading, error }] = useApi({
    url,
    headers
  });

  if (error) {
    return <Error error={error.message} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mt-5">
      <Link className="nav-link" to="/my-lists">
       <span>&#8678;</span> My Lists
      </Link>
      <div className="d-flex justify-content-center">
        <div className="col-md-12">
          {data ? (
            <Card>
              <Card.Body>
                <Card.Title>{data.name}</Card.Title>
                <ApartmentTable list={data.apartment_supply} />
              </Card.Body>
            </Card>
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
