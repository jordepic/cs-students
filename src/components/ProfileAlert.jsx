import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

class ProfileAlert extends Component {
  render() {
    return (
      <Alert variant="dark">
        Update your profile!
        <Button variant="outline-success" className="float-right">
          Save Changes
        </Button>
        <Button variant="outline-danger" className="float-right">
          Cancel Changes
        </Button>
      </Alert>
    );
  }
}

export default ProfileAlert;
