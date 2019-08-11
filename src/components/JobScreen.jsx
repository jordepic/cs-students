import React, { Component } from "react";
import { Form, Button, Container, Row, Card, Col } from "react-bootstrap";
import SingleJobView from "./SingleJobView";

class JobScreen extends Component {
  render() {
    return (
      <Container
        fluid="true"
        style={{
          padding: 0
        }}
      >
        <Row noGutters="true">
          <Col></Col>
          <Col xs={5}>
            <br />
            <SingleJobView />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default JobScreen;
