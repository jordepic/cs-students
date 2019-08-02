import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Form, Button, Container, Row } from "react-bootstrap";

class LoginForm extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <h3 className="text-center">
            {this.props.student
              ? "Find your externship today!"
              : "Find motivated STEM students from top schools!"}
          </h3>
        </Row>

        <Row>
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
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={() => this.props.handleAuthentication()}
            >
              {this.props.registration ? "Register" : "Sign In"}
            </Button>
          </Form>
        </Row>

        <Row>
          <Button
            className="btn btn-light btn-sm"
            onClick={() => this.props.handleAuthenticationTypeSwitch()}
          >
            {this.props.registration
              ? "Have an account?  Sign In."
              : "Don't have an account? Create one now!"}
          </Button>
        </Row>

        <Row>
          <Button
            className="btn btn-light btn-sm"
            onClick={() => this.props.handleUserSwitch()}
          >
            {this.props.student
              ? "Looking for employees?"
              : "Are you a current student?"}
          </Button>
        </Row>

        <br />
      </Container>
    );
  }
}

export default LoginForm;
