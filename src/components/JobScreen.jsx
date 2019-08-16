import React, { Component } from "react";
import { Form, Button, Container, Row, Card, Col } from "react-bootstrap";
import SingleJobView from "./SingleJobView";
import firebase from "firebase/app";

class JobScreen extends Component {
  jobListings = [];

  componentWillMount() {
    this.props.loadJobListings();
  }

  render() {
    return (
      <Container
        fluid="true"
        style={{
          padding: 0
        }}
      >
        <Row noGutters="true">
          {this.props.jobs.map(job => (
            <Col md={4}>
              <SingleJobView job={job} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default JobScreen;
