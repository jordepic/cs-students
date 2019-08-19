import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

export default class ApplicantTable extends Component {
  render() {
    return (
      <Table variant="dark">
        <caption>{this.props.title}</caption>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>University</th>
            <th>LinkedIn</th>
            <th>GitHub</th>
            <th>Resume</th>
          </tr>
        </thead>
      </Table>
    );
  }
}
