import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'

class Navbar extends Component {
  state = {}
  render() {
    return (<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <a className="navbar-brand" href="#">Externships</a>
    </nav>)
  }
}

export default Navbar
