import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Form, Button, Container, Row } from "react-bootstrap";
import EditStudentProfile from "./EditStudentProfile";
import EditCompanyProfile from "./EditCompanyProfile";
import ProfileAlert from "./ProfileAlert";

class EditJob extends Component {
  state = {
    title: "",
    description: ""
  };

  constructor() {
    super();
    this.handleUserInfoChange = this.handleUserInfoChange.bind(this);
  }

  handleUserInfoChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            name="title"
            placeholder="Job Title"
            onChange={this.handleUserInfoChange}
            defaultValue={this.props.title}
          />
          <Form.Text
            style={{
              color: "red"
            }}
          >
            *Required
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Job Description</Form.Label>
          <Form.Control
            name="description"
            placeholder="Job DescriptionL"
            onChange={this.handleUserInfoChange}
            as="textarea"
            rows="5"
            defaultValue={this.props.description}
          />
          <Form.Text
            style={{
              color: "red"
            }}
          >
            *Required
          </Form.Text>
        </Form.Group>
      </Form>
    );
  }
}

export default EditJob;
