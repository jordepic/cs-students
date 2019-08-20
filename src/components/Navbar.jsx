import React, { Component } from "react";
import { Col, Row, Nav } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import EditProfile from "./EditProfile";
import JobScreen from "./JobScreen";
import AllApplicants from "./AllApplicants";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <a className="navbar-brand" href="#">
            Externships
          </a>
          {this.props.loggedIn ? (
            <Nav.Item>
              {" "}
              <Nav.Link>
                <Link to="/profile">Profile</Link>
              </Nav.Link>
            </Nav.Item>
          ) : (
            ""
          )}
          {this.props.student ? (
            this.props.loggedIn ? (
              <Nav.Item>
                {" "}
                <Nav.Link>
                  <Link to="/jobs">Jobs</Link>
                </Nav.Link>
              </Nav.Item>
            ) : (
              ""
            )
          ) : this.props.loggedIn ? (
            <Nav.Item>
              {" "}
              <Nav.Link>
                <Link to="/applicants">Applicants</Link>
              </Nav.Link>
            </Nav.Item>
          ) : (
            ""
          )}
          {this.props.loggedIn ? (
            <Nav.Item>
              {" "}
              <Nav.Link onClick={() => this.props.signOut()}>Sign Out</Nav.Link>
            </Nav.Item>
          ) : (
            ""
          )}
        </nav>

        <Route
          path="/profile"
          render={() =>
            this.props.loggedIn ? (
              <EditProfile
                setFile={this.props.setFile}
                handleUserInfoChange={this.props.handleUserInfoChange}
                updateProfile={this.props.updateProfile}
                info={this.props.info}
                addJob={this.props.addJob}
                handleJobListingChange={this.props.handleJobListingChange}
                deleteJobListing={this.props.deleteJobListing}
                cancelEdits={this.props.cancelEdits}
              />
            ) : (
              ""
            )
          }
        />
        <Route
          path="/jobs"
          render={() =>
            this.props.loggedIn ? (
              <JobScreen
                loadJobListings={this.props.loadJobListings}
                jobs={this.props.jobs}
                apply={this.props.apply}
              />
            ) : (
              ""
            )
          }
        />
        <Route
          path="/applicants"
          render={() =>
            this.props.loggedIn ? (
              <AllApplicants
                jobs={this.props.jobs}
                loadApplicants={this.props.loadApplicants}
              />
            ) : (
              ""
            )
          }
        />
      </Router>
    );
  }
}

export default Navbar;
