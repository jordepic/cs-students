import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Applicant from "./Applicant";

export default class ApplicantTable extends Component {
  state = {
    apps: []
  };
  constructor() {
    super();
    this.applicants = [];
  }

  componentWillMount() {
    var applicantIDS = [];
    if (this.props.applicants !== true) {
      for (var prop in this.props.applicants) {
        if (Object.prototype.hasOwnProperty.call(this.props.applicants, prop)) {
          applicantIDS.push(prop);
        }
      }
    }
    this.setState({ apps: this.props.loadApplicants(applicantIDS) });
  }

  render() {
    this.applicants = this.state.apps.map(applicant => (
      <Applicant applicant={applicant} />
    ));
    return (
      <div>
        <br />
        <h3>{this.props.title}</h3>
        <Table variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>University</th>
              <th>Grade</th>
              <th>LinkedIn</th>
              <th>GitHub</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>{this.applicants}</tbody>
        </Table>
      </div>
    );
  }
}
