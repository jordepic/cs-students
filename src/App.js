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
import JobScreen from "./components/JobScreen";
import LoadingModal from "./components/LoadingModal";
import AllApplicants from "./components/AllApplicants";

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
    grade: "Freshman",
    resume: null,
    linkedin: "",
    github: "",
    resumeURL: "",
    companyName: "",
    companyURL: "",
    companyPhoto: "",
    companyPhotoURL: "",
    jobs: [],
    jobListings: [],
    school: "Yale"
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
    this.loadJobListings = this.loadJobListings.bind(this);
    this.apply = this.apply.bind(this);
    this.loadApplicants = this.loadApplicants.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref("/employers/" + user.uid)
          .once("value")
          .then(snapshot => {
            var info = snapshot.val();
            if (info === null) {
              firebase
                .database()
                .ref("/students/" + user.uid)
                .once("value")
                .then(snapshot => {
                  var info = snapshot.val();
                  this.setState({
                    student: true,
                    loggedIn: true,
                    loading: false,
                    uid: user.uid,
                    firstName: info.firstName === null ? "" : info.firstName,
                    lastName: info.lastName === null ? "" : info.lastName,
                    github: info.github === null ? "" : info.github,
                    linkedin: info.linkedin === null ? "" : info.linkedin,
                    resumeURL: info.resumeURL === null ? "" : info.resumeURL
                  });
                });
            } else {
              var jobs = [];
              if (info.jobs !== null && info.jobs !== undefined) {
                for (var prop in info.jobs) {
                  if (Object.prototype.hasOwnProperty.call(info.jobs, prop)) {
                    var job = info.jobs[prop];
                    jobs.push(job);
                  }
                }
              }
              this.setState({
                student: false,
                loggedIn: true,
                loading: false,
                uid: user.uid,
                companyName: info.companyName === null ? "" : info.companyName,
                companyURL: info.companyURL === null ? "" : info.companyURL,
                companyPhotoURL:
                  info.companyPhotoURL === null ? "" : info.companyPhotoURL,
                jobs
              });
            }
          });
        this.setState(prevState => {
          return { loggedIn: true, loading: false };
        });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  loadApplicants(uidArray) {
    var applicants = [];
    for (var uid of uidArray) {
      this.setState({ loading: true });
      firebase
        .database()
        .ref("students/" + uid)
        .once("value")
        .then(snapshot => {
          applicants.push(snapshot.val());
          this.setState({ loading: false });
        })
        .catch(error => {
          this.setState({ loading: false });
          return [];
        });
    }
    return applicants;
  }

  apply(jobPostID, index, companyID) {
    this.setState({ loading: true });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref("jobs/" + jobPostID + "/applicants/" + user.uid)
          .set(true)
          .then(() => {
            firebase
              .database()
              .ref(
                "employers/" +
                  companyID +
                  "/jobs/" +
                  jobPostID +
                  "/applicants/" +
                  user.uid
              )
              .set(true)
              .then(() => {
                var modifiedJobs = this.state.jobListings;
                modifiedJobs[index]["applied"] = true;
                this.setState({ loading: false, jobListings: modifiedJobs });
              });
          })
          .catch(error => {
            this.setState({ loading: false });
          });
      } else {
        this.setState({ loading: false });
        this.signOut();
      }
    });
  }

  loadJobListings() {
    this.setState({ loading: true });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref("jobs")
          .once("value")
          .then(snapshot => {
            var jobs = [];
            for (var prop in snapshot.val()) {
              if (Object.prototype.hasOwnProperty.call(snapshot.val(), prop)) {
                var job = snapshot.val()[prop];
                if (
                  snapshot.val()[prop]["applicants"] !== true &&
                  (user.uid in snapshot.val()[prop]["applicants"] &&
                    snapshot.val()[prop]["applicants"][user.uid] === true)
                ) {
                  job.applied = true;
                } else {
                  job.applied = false;
                }
                jobs.push(job);
              }
            }
            this.setState({ loading: false, jobListings: jobs });
          })
          .catch(error => {
            this.setState({ loading: false });
          });
      } else {
        this.setState({ loading: false });
        this.signOut();
      }
    });
  }

  cancelEdits() {
    this.setState({ loading: true });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (this.state.student) {
          firebase
            .database()
            .ref("/students/" + user.uid)
            .once("value")
            .then(snapshot => {
              var info = snapshot.val();
              this.setState({
                student: true,
                loggedIn: true,
                loading: false,
                uid: user.uid,
                firstName: info.firstName === null ? "" : info.firstName,
                lastName: info.lastName === null ? "" : info.lastName,
                github: info.github === null ? "" : info.github,
                linkedin: info.linkedin === null ? "" : info.linkedin,
                resumeURL: info.resumeURL === null ? "" : info.resumeURL
              });
            });
        } else {
          firebase
            .database()
            .ref("/employers/" + user.uid)
            .once("value")
            .then(snapshot => {
              var info = snapshot.val();
              this.setState({
                student: false,
                loggedIn: true,
                loading: false,
                uid: user.uid,
                companyName: info.companyName === null ? "" : info.companyName,
                companyURL: info.companyURL === null ? "" : info.companyURL,
                companyPhotoURL:
                  info.companyPhotoURL === null ? "" : info.companyPhotoURL,
                jobs: info.jobs === null ? [] : info.jobs
              });
            });
        }
      } else {
        this.setState({ loading: false });
        this.signOut();
      }
    });
  }

  signOut() {
    //Make sure to update to reflect defaults
    this.setState({ loading: true });
    firebase
      .auth()
      .signOut()
      .then(() => {
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
            grade: "Freshman",
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
      })
      .catch(function(error) {
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
            grade: "Freshman",
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
        if (
          this.state.lastName === "" ||
          this.state.firstName === "" ||
          this.state.grade === "" ||
          this.state.school === ""
        ) {
        } else {
          const {
            firstName,
            lastName,
            grade,
            linkedin,
            github,
            resume,
            resumeURL,
            school
          } = this.state;
          this.setState({ loading: true });
          if (
            this.state.resume === null ||
            this.state.resume === "" ||
            this.state.resume === undefined
          ) {
            firebase
              .database()
              .ref("students/" + user.uid)
              .set({
                firstName,
                lastName,
                grade,
                linkedin,
                github,
                resumeURL: "",
                email: user.email,
                school
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
                      resumeURL: url,
                      school,
                      email: user.email
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
          if (
            this.state.companyPhoto === null ||
            this.state.companyPhoto === "" ||
            this.state.companyPhoto === undefined
          ) {
            var updates = {};
            for (var job of this.state.jobs) {
              job.companyName = companyName;
              job.companyURL = companyURL;
              job.companyPhotoURL = "";
              job.applicants = true;
              job.postKey = firebase
                .database()
                .ref()
                .child("jobs")
                .push().key;
              job.companyID = user.uid;
              updates["/jobs/" + job.postKey] = job;
            }
            firebase
              .database()
              .ref("employers/" + user.uid)
              .set({
                companyName,
                companyURL,
                companyPhotoURL: "",
                email: user.email
              })
              .then(() => {
                firebase
                  .database()
                  .ref()
                  .update(updates)
                  .then(() => {
                    firebase
                      .database()
                      .ref("employers/" + user.uid)
                      .update(updates)
                      .then(() => {
                        this.setState({ loading: false });
                      });
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
                    job.applicants = true;
                    job.postKey = firebase
                      .database()
                      .ref()
                      .child("jobs")
                      .push().key;
                    job.companyID = user.uid;
                    updates["/jobs/" + job.postKey] = job;
                  }
                  firebase
                    .database()
                    .ref("employers/" + user.uid)
                    .set({
                      companyName,
                      companyURL,
                      companyPhotoURL: this.state.companyPhotoURL,
                      email: user.email
                    })
                    .then(() => {
                      firebase
                        .database()
                        .ref()
                        .update(updates)
                        .then(() => {
                          firebase
                            .database()
                            .ref("employers/" + user.uid)
                            .update(updates)
                            .then(() => {
                              this.setState({ loading: false });
                            });
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
                firstName: info.firstName === null ? "" : info.firstName,
                lastName: info.lastName === null ? "" : info.lastName,
                github: info.github === null ? "" : info.github,
                linkedin: info.linkedin === null ? "" : info.linkedin,
                resumeURL: info.resumeURL === null ? "" : info.resumeURL
              });
            });
        } else {
          firebase
            .database()
            .ref("/employers/" + user.user.uid)
            .once("value")
            .then(snapshot => {
              var info = snapshot.val();
              var jobs = [];
              if (info.jobs !== null && info.jobs !== undefined) {
                for (var prop in info.jobs) {
                  if (Object.prototype.hasOwnProperty.call(info.jobs, prop)) {
                    var job = info.jobs[prop];
                    jobs.push(job);
                  }
                }
              }
              this.setState({
                loggedIn: true,
                loading: false,
                uid: user.user.uid,
                companyName: info.companyName === null ? "" : info.companyName,
                companyURL: info.companyURL === null ? "" : info.companyURL,
                companyPhotoURL:
                  info.companyPhotoURL === null ? "" : info.companyPhotoURL,
                jobs
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
    if (this.state.email.includes(".edu") || this.state.student === false) {
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
    } else {
      this.setState({
        loading: false,
        error: "Must have valid .edu email to register"
      });
    }
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
            <Navbar
              loggedIn={this.state.loggedIn}
              signOut={this.signOut}
              student={this.state.student}
              setFile={this.setFile}
              handleUserInfoChange={this.handleUserInfoChange}
              updateProfile={this.updateProfile}
              info={this.state}
              addJob={this.addJob}
              handleJobListingChange={this.handleJobListingChange}
              deleteJobListing={this.deleteJobListing}
              cancelEdits={this.cancelEdits}
              loadJobListings={this.loadJobListings}
              jobs={this.state.jobs}
              apply={this.apply}
              loadApplicants={this.loadApplicants}
              email={this.state.email}
              password={this.state.password}
              registration={this.state.registration}
              handleAuthenticationTypeSwitch={
                this.handleAuthenticationTypeSwitch
              }
              handleAuthentication={this.handleAuthentication}
              handleUserSwitch={this.handleUserSwitch}
              error={this.state.error}
            />
          </Col>
        </Row>
        <Row noGutters="true">
          {this.state.loggedIn ? (
            ""
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
        <LoadingModal show={this.state.loading}></LoadingModal>
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
