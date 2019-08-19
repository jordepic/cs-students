import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Applicant from "./Applicant";

export default class ApplicantTable extends Component {
  render() {
    var applicantIDS = [];
    if (this.props.applicants !== true) {
      for (var prop in this.props.applicants) {
        if (Object.prototype.hasOwnProperty.call(this.props.applicants, prop)) {
          applicantIDS.push(prop);
        }
      }
    }
    const applicants = applicantIDS.map(applicantID => (
      <Applicant key={applicantID} id={applicantID} />
    ));
    return (
      <div>
        <br />
        <h3>{this.props.title}</h3>
        <Table variant="dark">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>University</th>
              <th>Grade</th>
              <th>LinkedIn</th>
              <th>GitHub</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>{applicants}</tbody>
        </Table>
      </div>
    );
  }
}