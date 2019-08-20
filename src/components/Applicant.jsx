import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

export default class ApplicantTable extends Component {
  componentWillMount() {}
  render() {
    return (
      <tr>
        <td>{`${this.props.applicant.firstName}
        ${this.props.applicant.lastName}`}</td>
        <td>{this.props.applicant.email}</td>
        <td>{this.props.applicant.school}</td>
        <td>{this.props.applicant.grade}</td>
        <td>
          <a href={this.props.applicant.linkedin}>
            {this.props.applicant.linkedin}
          </a>
        </td>
        <td>
          <a href={this.props.applicant.github}>
            {this.props.applicant.github}
          </a>
        </td>
        <td>
          <a href={this.props.applicant.resumeURL}>Resume</a>
        </td>
      </tr>
    );
  }
}
