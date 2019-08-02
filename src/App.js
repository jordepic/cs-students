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
    registration: false,
    uid: ""
  };

  constructor() {
    super();
    this.handleUserInfoChange = this.handleUserInfoChange.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.handleButtonSwitch = this.handleButtonSwitch.bind(this);
    this.handleUserSwitch = this.handleUserSwitch.bind(this);
  }

  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       this.setState(prevState => {
  //         return {loggedIn: true, email: prevState.email, password: prevState.password, student: prevState.student, registration: prevState.registration};
  //       });
  //     }
  //   });
  // }

  handleUserInfoChange(event) {
    const { student, registration, uid } = this.state;
    this.setState({
      [event.target.name]: event.target.value,
      student: student,
      registration: registration,
      uid: uid
    });
  }

  handleAuthentication() {
    let email = this.state.email;
    let password = this.state.password;

    if (this.state.registration) {
      this.register(email, password);
    } else {
      this.login(email, password);
    }
  }

  login(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState(prevState => {
          return {
            loggedIn: true,
            email: prevState.email,
            password: prevState.password,
            student: prevState.student,
            registration: prevState.registration,
            uid: user.user.uid
          };
        });
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  register(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        if (this.state.student) {
          firebase
            .database()
            .ref("students/" + user.user.uid)
            .set(true);
        } else {
          firebase
            .database()
            .ref("employers/" + user.user.uid)
            .set(true);
        }
        this.setState(prevState => {
          return {
            loggedIn: true,
            email: prevState.email,
            password: prevState.password,
            student: prevState.student,
            registration: prevState.registration,
            uid: user.user.uid
          };
        });
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  handleButtonSwitch() {
    this.setState(prevState => {
      return {
        email: prevState.email,
        password: prevState.password,
        student: prevState.student,
        registration: !prevState.registration,
        uid: prevState.uid
      };
    });
  }

  handleUserSwitch() {
    this.setState(prevState => {
      return {
        email: prevState.email,
        password: prevState.password,
        student: !prevState.student,
        registration: prevState.registration,
        uid: prevState.uid
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
