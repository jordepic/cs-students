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
    loading: false,
    error: "",
    firstName: "",
    lastName: "",
    grade: "freshman",
    resume: "",
    linkedin: "",
    github: ""
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
    this.setState({
      [event.target.name]: event.target.value
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
      return { loading: true };
    });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState(prevState => {
          return {
            loggedIn: true,
            uid: user.user.uid,
            loading: false,
            error: ""
          };
        });
      })
      .catch(error => {
        var errorCode = error.code;
        this.setError(errorCode);
      });
  }

  register(email, password) {
    this.setState(prevState => {
      return { loading: true };
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
            uid: user.user.uid,
            loading: false,
            error: ""
          };
        });
      })
      .catch(error => {
        var errorCode = error.code;
        this.setError(errorCode);
      });
  }

  setError(code) {
    if (code === "auth/wrong-password") {
      this.setState(prevState => {
        return {
          loading: false,
          error: "Either email or password is incorrect, try again."
        };
      });
    } else if (code === "auth/user-not-found") {
      this.setState(prevState => {
        return {
          loading: false,
          error: "No account associated with this email."
        };
      });
    } else if (code === "auth/invalid-email") {
      this.setState(prevState => {
        return { loading: false, error: "Email address not valid." };
      });
    } else if (code === "auth/weak-password") {
      this.setState(prevState => {
        return { loading: false, error: "Password too weak." };
      });
    } else {
      this.setState(prevState => {
        return {
          loading: false,
          error: "Unknown error, try a different email or password."
        };
      });
    }
  }

  handleAuthenticationTypeSwitch() {
    this.setState(prevState => {
      return {
        registration: !prevState.registration
      };
    });
  }

  handleUserSwitch() {
    this.setState(prevState => {
      return {
        student: !prevState.student
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
        <Row noGutters="true">
          <Col xl={true}>
            <Navbar />
          </Col>
        </Row>
        <Row noGutters="true">
          {this.state.loggedIn ? (
            this.state.registration ? (
              <EditProfile
                student={this.state.student}
                handleUserInfoChange={this.handleUserInfoChange}
              />
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
              error={this.state.error}
            />
          )}
        </Row>
        {this.state.loading ? <div className="spinner-border"></div> : ""}
      </Container>
    );
  }
}
