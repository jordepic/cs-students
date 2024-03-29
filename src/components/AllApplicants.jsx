import React, { Component } from "react";
import { Form, Button, Container, Row, Alert, Col } from "react-bootstrap";
import ApplicantTable from "./ApplicantTable";

export default class AllApplicants extends Component {
  render() {
    const applicantTables = this.props.jobs.map(job => (
      <ApplicantTable
        key={job.postKey}
        id={job.postKey}
        title={job.title}
        applicants={job.applicants}
        loadApplicants={this.props.loadApplicants}
      />
    ));
    return (
      <Container
        fluid={true}
        style={{
          padding: 0
        }}
      >
        <Row>
          <Col></Col>
          <Col xs={10}>{applicantTables}</Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}
