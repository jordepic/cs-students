import React, { Component } from "react";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default class App extends Component {
  state = {
    loggedIn: false,
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
      <Container fluid="fluid">
        <Row>
          <Col xl={true}>
            <Navbar />
          </Col>
        </Row>
        <Row>
          <Col
            xl={{
              span: 6,
              offset: 3
            }}
          >
            {this.state.loggedIn ? (
              ""
            ) : (
              <LoginForm
                email={this.state.email}
                password={this.state.password}
                student={this.state.student}
                registration={this.state.registration}
                handleUserInfoChange={this.handleUserInfoChange}
                handleButtonSwitch={this.handleButtonSwitch}
                handleAuthentication={this.handleAuthentication}
                handleUserSwitch={this.handleUserSwitch}
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
