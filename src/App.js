import React, { Component } from "react";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
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
    github: "",
    resumeURL: "",
    companyName: "",
    companyURL: "",
    companyPhoto: "",
    companyPhotoURL: "",
    jobs: []
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
    this.setFile = this.setFile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.addJob = this.addJob.bind(this);
    this.handleJobListingChange = this.handleJobListingChange.bind(this);
    this.deleteJobListing = this.deleteJobListing.bind(this);
    this.studentUpload = this.studentUpload.bind(this);
    this.companyUpload = this.companyUpload.bind(this);
    this.signOut = this.signOut.bind(this);
    this.cancelEdits = this.cancelEdits.bind(this);
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

  cancelEdits() {}

  signOut() {
    this.setState(prevState => {
      return {
        loggedIn: false,
        email: "",
        password: "",
        student: prevState.student,
        registration: prevState.registration,
        uid: "",
        loading: false,
        error: "",
        firstName: "",
        lastName: "",
        grade: "freshman",
        resume: "",
        linkedin: "",
        github: "",
        resumeURL: "",
        companyName: "",
        companyURL: "",
        companyPhoto: "",
        companyPhotoURL: "",
        jobs: []
      };
    });
  }

  addJob(title, description) {
    const job = new Job(title, description);
    this.setState(prevState => {
      return {
        jobs: [...prevState.jobs, job]
      };
    });
  }

  handleJobListingChange(event, id) {
    var jobs = this.state.jobs;
    if (event.target.name === "title") {
      jobs[id].title = event.target.value;
    } else if (event.target.name === "description") {
      jobs[id].description = event.target.value;
    }
    this.setState({ jobs: jobs });
  }

  deleteJobListing(id) {
    var jobs = this.state.jobs;
    jobs.splice(id, 1);
    this.setState({ jobs: jobs });
  }

  studentUpload() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (this.state.lastName === "" || this.state.firstName === "") {
        } else {
          const {
            firstName,
            lastName,
            grade,
            linkedin,
            github,
            resume,
            resumeURL
          } = this.state;
          this.setState({ loading: true });
          if (this.state.resume === null) {
            firebase
              .database()
              .ref("students/" + user.uid)
              .set({
                firstName,
                lastName,
                grade,
                linkedin,
                github,
                resumeURL,
                email: user.email
              })
              .then(() => {
                this.setState({ loading: false });
              })
              .catch(error => {
                this.setState({ loading: false });
              });
          } else {
            const resumeRef = firebase
              .storage()
              .ref()
              .child(user.uid + "/resume.pdf");
            resumeRef
              .put(this.state.resume)
              .then(snapshot => {
                resumeRef.getDownloadURL().then(url => {
                  this.setState({ resumeURL: url });
                  firebase
                    .database()
                    .ref("students/" + user.uid)
                    .set({
                      firstName,
                      lastName,
                      grade,
                      linkedin,
                      github,
                      resumeURL: url
                    })
                    .then(() => {
                      this.setState({ loading: false });
                    });
                });
              })
              .catch(error => {
                this.setState({ loading: false });
              });
          }
        }
      } else {
        this.signOut();
      }
    });
  }

  companyUpload() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var jobListingsEmpty = false;
        for (var job of this.state.jobs) {
          if (job.description === "" || job.title === "") {
            jobListingsEmpty = true;
          }
        }
        if (
          this.state.companyName === "" ||
          this.state.companyURL === "" ||
          jobListingsEmpty
        ) {
          // Set error state, display on screen
        } else {
          this.setState({ loading: true });
          const {
            companyName,
            companyURL,
            companyPhoto,
            jobs,
            companyPhotoURL
          } = this.state;
          if (this.state.companyPhoto === null) {
            var updates = {};
            for (var job of this.state.jobs) {
              job.companyName = companyName;
              job.companyURL = companyURL;
              job.companyPhotoURL = this.state.companyPhotoURL;
              job.postKey = firebase
                .database()
                .ref()
                .child("jobs")
                .push().key;
              updates["/jobs/" + job.postKey] = job;
            }
            firebase
              .database()
              .ref("employers/" + user.uid)
              .set({ companyName, companyURL, jobs, companyPhotoURL })
              .then(() => {
                firebase
                  .database()
                  .ref()
                  .update(updates)
                  .then(() => {
                    this.setState({ loading: false });
                  });
              })
              .catch(error => {
                this.setState({ loading: false });
              });
          } else {
            const logo = firebase
              .storage()
              .ref()
              .child(user.uid + "/logo");
            logo
              .put(this.state.companyPhoto)
              .then(snapshot => {
                logo.getDownloadURL().then(url => {
                  this.setState({ companyPhotoURL: url });
                  var updates = {};
                  for (var job of this.state.jobs) {
                    job.companyName = companyName;
                    job.companyURL = companyURL;
                    job.companyPhotoURL = this.state.companyPhotoURL;
                    job.postKey = firebase
                      .database()
                      .ref()
                      .child("jobs")
                      .push().key;
                    updates["/jobs/" + job.postKey] = job;
                  }
                  firebase
                    .database()
                    .ref("employers/" + user.uid)
                    .set({
                      companyName,
                      companyURL,
                      jobs,
                      companyPhotoURL: this.state.companyPhotoURL
                    })
                    .then(() => {
                      firebase
                        .database()
                        .ref()
                        .update(updates)
                        .then(() => {
                          this.setState({ loading: false });
                        });
                    });
                });
              })
              .catch(error => {
                this.setState({ loading: false });
              });
          }
        }
      } else {
        this.signOut();
      }
    });
  }

  updateProfile() {
    if (this.state.student) {
      this.studentUpload();
    } else {
      this.companyUpload();
    }
  }

  setFile(event) {
    this.setState({
      [event.target.name]: event.target.files[0]
    });
  }

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
        if (this.state.student) {
          firebase
            .database()
            .ref("/students/" + user.user.uid)
            .once("value")
            .then(snapshot => {
              var info = snapshot.val();
              this.setState({
                loggedIn: true,
                loading: false,
                uid: user.user.uid,
                firstName: info.firstName,
                lastName: info.lastName,
                github: info.github,
                linkedin: info.linkedin,
                resumeURL: info.resumeURL
              });
            });
        } else {
          firebase
            .database()
            .ref("/employers/" + user.user.uid)
            .once("value")
            .then(snapshot => {
              var info = snapshot.val();
              this.setState({
                loggedIn: true,
                loading: false,
                uid: user.user.uid,
                companyName: info.companyName,
                companyURL: info.companyURL,
                companyPhotoURL: info.companyPhotoURL,
                jobs: info.jobs
              });
            });
        }
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
                setFile={this.setFile}
                handleUserInfoChange={this.handleUserInfoChange}
                updateProfile={this.updateProfile}
                info={this.state}
                addJob={this.addJob}
                handleJobListingChange={this.handleJobListingChange}
                deleteJobListing={this.deleteJobListing}
                cancelEdits={this.cancelEdits}
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

class Job {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}
