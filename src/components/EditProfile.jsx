import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Form, Button, Container, Row } from "react-bootstrap";
import EditStudentProfile from "./EditStudentProfile";
import EditCompanyProfile from "./EditCompanyProfile";

class EditProfile extends Component {
  render() {
    if (this.props.student) {
      return <EditStudentProfile />;
    }
    return <EditCompanyProfile />;
  }
}

export default EditProfile;
