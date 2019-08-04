import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

class LoginForm extends Component {
  render() {
    return (
      <Container
        fluid={true}
        style={{
          padding: 0
        }}
      >
        <Alert variant="danger">
          <Alert.Heading>We're sorry for the inconvenience!</Alert.Heading>Hi
          everyone! At the moment, we are only accepting students enrolled in
          Cornell University, Columbia, or Yale. We're not elitist, it's just
          where we go.
        </Alert>
        <br />
        <Row>
          <Col></Col>
          <Col xs={5}>
            <h3 className="text-center">
              {this.props.student
                ? "Find your externship today!"
                : "Find motivated STEM students from top schools!"}
            </h3>
            <br />
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={5}>
            <Form>
              <Form.Group controlId="form_email">
                <Form.Control
                  onChange={event => this.props.handleUserInfoChange(event)}
                  name="email"
                  type="text"
                  placeholder="email"
                />
              </Form.Group>

              <Form.Group controlId="form_password">
                <Form.Control
                  onChange={event => this.props.handleUserInfoChange(event)}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <Form.Text
                  style={{
                    color: "red"
                  }}
                >
                  {this.props.error}
                </Form.Text>
              </Form.Group>

              <Button
                variant="dark"
                onClick={() => this.props.handleAuthentication()}
                block="block"
              >
                {this.props.registration ? "Register" : "Sign In"}
              </Button>

              <Button
                className="btn btn-light btn-sm"
                onClick={() => this.props.handleAuthenticationTypeSwitch()}
                block="block"
              >
                {this.props.registration
                  ? "Have an account?  Sign In."
                  : "Don't have an account? Create one now!"}
              </Button>

              <Button
                className="btn btn-light btn-sm"
                onClick={() => this.props.handleUserSwitch()}
                block="block"
              >
                {this.props.student
                  ? "Looking for employees?"
                  : "Are you a current student?"}
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default LoginForm;
