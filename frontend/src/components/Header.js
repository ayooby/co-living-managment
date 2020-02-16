import React from "react";

import { TOKEN } from "../config";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Header() {

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Lifex Manager</Navbar.Brand>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/my-lists">
            My Lists
          </Link>
          {TOKEN ? (
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
}

export default Header;
