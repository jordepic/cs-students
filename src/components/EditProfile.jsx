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
        <ProfileAlert updateProfile={this.props.updateProfile} />
        <br />{" "}
        {this.props.info.student ? (
          <EditStudentProfile
            handleUserInfoChange={this.props.handleUserInfoChange}
            setFile={this.props.setFile}
            firstName={this.props.info.firstName}
            lastName={this.props.info.lastName}
            linkedin={this.props.info.linkedin}
            github={this.props.info.github}
            grade={this.props.info.grade}
          />
        ) : (
          <EditCompanyProfile
            handleUserInfoChange={this.props.handleUserInfoChange}
            setFile={this.props.setFile}
            companyName={this.props.info.companyName}
            companyURL={this.props.info.companyURL}
            companyPhoto={this.props.info.companyPhoto}
            jobs={this.props.info.jobs}
            addJob={this.props.addJob}
            handleJobListingChange={this.props.handleJobListingChange}
            deleteJobListing={this.props.deleteJobListing}
          />
        )}
      </Container>
    );
  }
}

export default EditProfile;
