import React, { Component } from "react";
import { Form, Button, Container, Row, Card, Col } from "react-bootstrap";
import SingleJobView from "./SingleJobView";

class JobScreen extends Component {
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
              <SingleJobView
                id={this.props.jobs.indexOf(job)}
                apply={this.props.apply}
                job={job}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default JobScreen;
