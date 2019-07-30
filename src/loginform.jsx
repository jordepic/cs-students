import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './navbar'
import firebase from "firebase/app";
import "firebase/auth";

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  }

  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleRegistration = this.handleRegistration.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRegistration() {
    let username = this.state.username
    let password = this.state.password
    console.log(username)
    console.log(password)
    firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
    });
  }

  render() {
    return (<div>
      <Navbar/>
      <h3 className="text-center">Create an account for available externships!</h3>

      <form>
        <div className="form-group">
          <input type="text" name="username" placeholder="Username" className="form-control" onChange={this.handleChange}/>
        </div>

        <div className="form-group">
          <input type="text" name="password" placeholder="Password" className="form-control" onChange={this.handleChange}/>
        </div>

        <br/>
        <div className="text-center">
          <button className="btn btn-dark btn-lg" onClick={this.handleRegistration}>Register</button>
        </div>

      </form>
    </div>);
  }
}

export default LoginForm;
