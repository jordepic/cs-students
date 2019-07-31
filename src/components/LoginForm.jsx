import React, {Component} from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { Form, Button } from 'react-bootstrap'



class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    student: true,
    registration: true
  }

  constructor() {
    super()
    this.handleUserInfoChange = this.handleUserInfoChange.bind(this)
    this.handleRegistration = this.handleRegistration.bind(this)
    this.handleButtonSwitch = this.handleButtonSwitch.bind(this)
    this.handleUserSwitch = this.handleUserSwitch.bind(this)
  }

  handleUserInfoChange(event) {
    this.setState(prevState => {
      return {
        [event.target.name]: event.target.value,
        student: prevState.student,
        registration: prevState.registration
      }
    })
  }

  handleRegistration() {
    let username = this.state.username
    let password = this.state.password

    firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

    });
  }

  handleButtonSwitch() {
    this.setState(prevState => {
      return {
        username: prevState.username,
        password: prevState.password,
        student: prevState.student,
        registration: !prevState.registration
      }
    })
  }

  handleUserSwitch() {
    this.setState(prevState => {
      return {
        username: prevState.username,
        password: prevState.password,
        student: !prevState.student,
        registration: prevState.registration
      }
    })
  }

  render() {
    return (<div>
      <h3 className="text-center">{
          this.state.student
            ? "Find your externship today!"
            : "Find motivated STEM students from top schools!"
        }</h3>

      <br/>

      <Form>
        <Form.Group controlId="form_username">
          <Form.Control onChange={this.handleUserInfoChange} name="username" type="text" placeholder="Username" />
        </Form.Group>

        <Form.Group controlId="form_password">
          <Form.Control onChange={this.handleUserInfoChange} name="password" type="password" placeholder="Password" />
        </Form.Group> 
        
        <Button variant="primary" type="submit" onClick={this.handleRegistration}>
          { this.state.registration
            ? "Register"
            : "Sign In"
          }
        </Button>
      </Form>

        <Button className="btn btn-light btn-sm" onClick={this.handleButtonSwitch}>{
            this.state.registration
              ? "Have an account?  Sign In."
              : "Don't have an account? Create one now!"
          }</Button>

        <br />
        <Button className="btn btn-light btn-sm" onClick={this.handleUserSwitch}>{
            this.state.student
              ? "Looking for employees?"
              : "Are you a current student?" }
        </Button>
        
      </div>
    );
  }
}

export default LoginForm;
