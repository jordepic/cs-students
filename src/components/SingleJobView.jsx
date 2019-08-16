import React, { Component } from "react";
import { Card, Image, Row, Col } from "react-bootstrap";

class SingleJobView extends Component {
  render() {
    return (
      <div>
        <Card bg="light" className="m-3">
          <Card.Header>
            <Row>
              <Col md={3}>
                <Image
                  src={
                    this.props.job
                      ? this.props.job.imgLink
                      : "https://mycareersdb.com/users/default/no_avatar_company.png"
                  }
                  fluid
                  thumbnail
                />
              </Col>
              <Col>
                <a
                  href={
                    this.props.job ? this.props.job.companyUrl : "google.com"
                  }
                >
                  <h2>
                    {this.props.job
                      ? this.props.job.companyName
                      : "Company Title"}
                  </h2>
                </a>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              {this.props.job ? this.props.job.title : "Job Title"}
            </Card.Title>
            <Card.Text>
              {this.props.job ? this.props.job.description : "Job description"}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default SingleJobView;
