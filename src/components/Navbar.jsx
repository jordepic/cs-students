import React, { Component } from "react";
import { Col, Row, Nav } from "react-bootstrap";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <a className="navbar-brand" href="#">
          Externships
        </a>
        {this.props.loggedIn ? (
          <Nav.Item>
            <Nav.Link onClick={() => this.props.signOut()}>Sign Out</Nav.Link>
          </Nav.Item>
        ) : (
          ""
        )}
      </nav>
    );
  }
}

export default Navbar;
