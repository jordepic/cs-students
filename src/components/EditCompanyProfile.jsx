import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Form, Button, Container, Row, Alert } from "react-bootstrap";

class EditCompanyProfile extends Component {
  render() {
    return (
      <div>
        <Alert variant="primary">
          Update your profile!
          <Button variant="outline-success">Save Changes</Button>
          <Button variant="outline-danger">Cancel Changes</Button>
        </Alert>
      </div>
    );
  }
}

export default EditCompanyProfile;
