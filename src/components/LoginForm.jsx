import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Form, Button, Container, Row } from "react-bootstrap";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    student: true,
    registration: true
  };

  constructor() {
    super();
    this.handleUserInfoChange = this.handleUserInfoChange.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.handleButtonSwitch = this.handleButtonSwitch.bind(this);
    this.handleUserSwitch = this.handleUserSwitch.bind(this);
  }

  handleUserInfoChange(event) {
    const { student, registration } = this.state;
    this.setState({
      [event.target.name]: event.target.value,
      student: student,
      registration: registration
    });
  }

  handleAuthentication() {
    let email = this.state.email;
    let password = this.state.password;

    if (this.state.registration) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
      //Upload user id to realtime database, not working at the moment
      var database = firebase.database();
      if (this.state.student) {
        database
          .ref()
          .child("students/" + firebase.auth().currentUser.uid)
          .set(true);
      } else {
        database
          .ref()
          .child("employers/" + firebase.auth().currentUser.uid)
          .set(true);
      }
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }
  }

  handleButtonSwitch() {
    this.setState(prevState => {
      return {
        email: prevState.email,
        password: prevState.password,
        student: prevState.student,
        registration: !prevState.registration
      };
    });
  }

  handleUserSwitch() {
    this.setState(prevState => {
      return {
        email: prevState.email,
        password: prevState.password,
        student: !prevState.student,
        registration: prevState.registration
      };
    });
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <h3 className="text-center">
            {this.state.student
              ? "Find your externship today!"
              : "Find motivated STEM students from top schools!"}
          </h3>
        </Row>

        <Row>
          <Form>
            <Form.Group controlId="form_email">
              <Form.Control
                onChange={event => this.handleUserInfoChange(event)}
                name="email"
                type="text"
                placeholder="email"
              />
            </Form.Group>

            <Form.Group controlId="form_password">
              <Form.Control
                onChange={event => this.handleUserInfoChange(event)}
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={this.handleAuthentication}
            >
              {this.state.registration ? "Register" : "Sign In"}
            </Button>
          </Form>
        </Row>

        <Row>
          <Button
            className="btn btn-light btn-sm"
            onClick={this.handleButtonSwitch}
          >
            {this.state.registration
              ? "Have an account?  Sign In."
              : "Don't have an account? Create one now!"}
          </Button>
        </Row>

        <Row>
          <Button
            className="btn btn-light btn-sm"
            onClick={this.handleUserSwitch}
          >
            {this.state.student
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
