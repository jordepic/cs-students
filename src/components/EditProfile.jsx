import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Form, Button, Container, Row } from "react-bootstrap";
import EditStudentProfile from "./EditStudentProfile";
import EditCompanyProfile from "./EditCompanyProfile";
import ProfileAlert from "./ProfileAlert";

class EditProfile extends Component {
  render() {
    return (
      <Container
        fluid="true"
        style={{
          padding: 0
        }}
      >
        <ProfileAlert />
        <br />{" "}
        {this.props.student ? (
          <EditStudentProfile
            handleUserInfoChange={this.props.handleUserInfoChange}
          />
        ) : (
          <EditCompanyProfile
            handleUserInfoChange={this.props.handleUserInfoChange}
          />
        )}
      </Container>
    );
  }
}

export default EditProfile;
