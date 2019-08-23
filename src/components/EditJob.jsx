import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Form, Button, Container, Row, Card } from "react-bootstrap";
import EditStudentProfile from "./EditStudentProfile";
import EditCompanyProfile from "./EditCompanyProfile";
import ProfileAlert from "./ProfileAlert";

class EditJob extends Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                name="title"
                placeholder="Job Title"
                onChange={event =>
                  this.props.handleJobListingChange(event, this.props.id)
                }
                value={this.props.title}
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
                placeholder="Job Description"
                onChange={event =>
                  this.props.handleJobListingChange(event, this.props.id)
                }
                as="textarea"
                rows="5"
                value={this.props.description}
              />
              <Form.Text
                style={{
                  color: "red"
                }}
              >
                *Required
              </Form.Text>
            </Form.Group>

            <Button
              variant="danger"
              onClick={() => this.props.deleteJobListing(this.props.id)}
            >
              Delete
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default EditJob;
