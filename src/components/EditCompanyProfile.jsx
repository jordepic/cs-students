import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Form, Button, Container, Row, Alert, Col } from "react-bootstrap";
import EditJob from "./components/EditJob";

class EditCompanyProfile extends Component {
  constructor() {
    super();
  }

  //const jobListings = this.props.jobs.map(job => <EditJob title={job.title} description={job.description}/>)

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
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  name="companyName"
                  placeholder="Company Name"
                  onChange={event => this.props.handleUserInfoChange(event)}
                  defaultValue={this.props.companyName}
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
                <Form.Label>Comapny URL</Form.Label>
                <Form.Control
                  name="companyURL"
                  placeholder="Company URL"
                  onChange={event => this.props.handleUserInfoChange(event)}
                  defaultValue={this.props.companyURL}
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
                <Form.Label>
                  Company Logo (If no file is selected existing logo will not be
                  overridden)
                </Form.Label>
                <br />
                <input
                  type="file"
                  name="companyPhoto"
                  accept="image/*"
                  onChange={event => this.props.setFile(event)}
                />
                <Form.Text className="text-muted">Must be an image</Form.Text>
              </Form.Group>

              <Button
                variant="dark"
                onClick={() => this.props.addJob("", "")}
                block="block"
              >
                Add Job Listing
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default EditCompanyProfile;
