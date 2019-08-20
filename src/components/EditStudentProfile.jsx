import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

class EditStudentProfile extends Component {
  render() {
    return (
      <Container
        fluid={true}
        style={{
          padding: 0
        }}
      >
        <Row>
          <Col></Col>
          <Col xs={6}>
            <Form>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  placeholder="First Name"
                  onChange={event => this.props.handleUserInfoChange(event)}
                  defaultValue={this.props.firstName}
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
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="lastName"
                  placeholder="Last Name"
                  onChange={event => this.props.handleUserInfoChange(event)}
                  defaultValue={this.props.lastName}
                />
                <Form.Text
                  style={{
                    color: "red"
                  }}
                >
                  *Required
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select College</Form.Label>
                <Form.Control
                  as="select"
                  name="school"
                  onChange={event => this.props.handleUserInfoChange(event)}
                  defaultValue={this.props.school}
                >
                  <option value="Yale">Yale</option>
                  <option value="Columbia">Columbia</option>
                  <option value="Cornell">Cornell</option>
                </Form.Control>
                <Form.Text
                  style={{
                    color: "red"
                  }}
                >
                  *Required
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select School Year</Form.Label>
                <Form.Control
                  as="select"
                  name="grade"
                  onChange={event => this.props.handleUserInfoChange(event)}
                  defaultValue={this.props.grade}
                >
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                </Form.Control>
                <Form.Text
                  style={{
                    color: "red"
                  }}
                >
                  *Required
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Linkedin Profile</Form.Label>
                <Form.Control
                  name="linkedin"
                  placeholder="LinkedIn"
                  onChange={event => this.props.handleUserInfoChange(event)}
                  defaultValue={this.props.linkedin}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Github Profile</Form.Label>
                <Form.Control
                  name="github"
                  placeholder="Github"
                  onChange={event => this.props.handleUserInfoChange(event)}
                  defaultValue={this.props.github}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Resume/CV (If no file is selected existing resume will not be
                  overridden)
                </Form.Label>
                <br />
                <input
                  type="file"
                  name="resume"
                  accept=".pdf"
                  onChange={event => this.props.setFile(event)}
                />
                <Form.Text className="text-muted">
                  Must be .pdf format
                </Form.Text>
              </Form.Group>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default EditStudentProfile;
