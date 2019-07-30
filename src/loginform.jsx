import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'

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
    const {username, password} = this.state
    // firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
    //    Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    // });
  }

  render() {
    return (<div>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <a class="navbar-brand" href="#">Externships</a>
      </nav>

      <h3 className="text-center">Create an account for available externships!</h3>

      <form>
        <div className="form-group">
          <input type="text" name="username" placeholder="Username" className="form-control" onChange={this.handleChange}/>
        </div>

        <div className="form-group">
          <input type="text" name="password" placeholder="Password" className="form-control" onChange={this.handleChange}/>
        </div>

        <br/>

        <button className="btn btn-dark" onClick={this.handleRegistration}>Register</button>
      </form>
    </div>);
  }
}

export default LoginForm;
