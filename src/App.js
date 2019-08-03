import React, { Component } from "react";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import EditProfile from "./components/EditProfile";

export default class App extends Component {
  state = {
    loggedIn: false,
    email: "",
    password: "",
    student: true,
    registration: false,
    uid: "",
    loading: false
  };

  constructor() {
    super();
    this.handleUserInfoChange = this.handleUserInfoChange.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.handleAuthenticationTypeSwitch = this.handleAuthenticationTypeSwitch.bind(
      this
    );
    this.handleUserSwitch = this.handleUserSwitch.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
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

  // The spinner looks kinda dumb rn, you're gonna have to style that lol

  handleUserInfoChange(event) {
    const { student, registration, uid, loggedIn, loading } = this.state;
    this.setState({
      [event.target.name]: event.target.value,
      student: student,
      registration: registration,
      uid: uid,
      loggedIn: loggedIn,
      loading: loading
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
    this.setState(prevState => {
      return {
        loggedIn: prevState.login,
        email: prevState.email,
        password: prevState.password,
        student: prevState.student,
        registration: prevState.registration,
        uid: prevState.uid,
        loading: true
      };
    });
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
            uid: user.user.uid,
            loading: false
          };
        });
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  register(email, password) {
    this.setState(prevState => {
      return {
        loggedIn: prevState.login,
        email: prevState.email,
        password: prevState.password,
        student: prevState.student,
        registration: prevState.registration,
        uid: prevState.uid,
        loading: true
      };
    });
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
            uid: user.user.uid,
            loading: false
          };
        });
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  handleAuthenticationTypeSwitch() {
    this.setState(prevState => {
      return {
        email: prevState.email,
        password: prevState.password,
        student: prevState.student,
        registration: !prevState.registration,
        uid: prevState.uid,
        loading: prevState.loading,
        loggedIn: prevState.loggedIn
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
        uid: prevState.uid,
        loading: prevState.loading,
        loggedIn: prevState.loggedIn
      };
    });
  }

  render() {
    return (
      <Container
        fluid="true"
        style={{
          padding: 0
        }}
      >
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
              this.state.registration ? (
                <EditProfile student={this.state.student} />
              ) : (
                ""
              )
            ) : (
              <LoginForm
                email={this.state.email}
                password={this.state.password}
                student={this.state.student}
                registration={this.state.registration}
                handleUserInfoChange={this.handleUserInfoChange}
                handleAuthenticationTypeSwitch={
                  this.handleAuthenticationTypeSwitch
                }
                handleAuthentication={this.handleAuthentication}
                handleUserSwitch={this.handleUserSwitch}
              />
            )}
          </Col>
        </Row>
        {this.state.loading ? <div class="spinner-border"></div> : ""}
      </Container>
    );
  }
}
