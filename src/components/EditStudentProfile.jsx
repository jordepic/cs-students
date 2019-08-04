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
                <Form.Control name="firstName" placeholder="First Name" />
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
                <Form.Control name="lastName" placeholder="Last Name" />
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
                <Form.Control as="select">
                  <option>Freshman</option>
                  <option>Sophomore</option>
                  <option>Junior</option>
                  <option>Senior</option>
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
                <Form.Control name="Linkedin" placeholder="LinkedIn" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Github Profile</Form.Label>
                <Form.Control name="Linkedin" placeholder="Github" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Resume/CV</Form.Label>
                <br />
                <input type="file" name="pic" accept=".doc, .docx, .pdf" />
                <Form.Text
                  style={{
                    color: "red"
                  }}
                >
                  *Required - must be .doc, .docx, .pdf format
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
