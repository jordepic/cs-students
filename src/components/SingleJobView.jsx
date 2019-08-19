import React, { Component } from "react";
import { Card, Image, Row, Col, Button, Figure } from "react-bootstrap";
import styled from "styled-components";

class SingleJobView extends Component {
  CompanyLink = styled.a`
    color: black;
    height: 100%;

    &:hover {
      color: black;
    }
  `;
  CompanyName = styled(Card.Title)`
    font-size: 2rem;
  `;

  ImageHolder = styled.div`
    height: 50px;
    width: auto;
    margin-left: auto;
  `;

  ScaleImage = styled(Image)`
    max-width: 100%;
    max-height: 100%;
    margin-left: auto;
    padding: 0%;
    display: block;
  `;

  render() {
    return (
      <div>
        <Card bg="light" className="m-3">
          <Card.Header flex="flex">
            <Row>
              <Col>
                <this.CompanyLink
                  href={this.props.job ? this.props.job.companyURL : "#"}
                >
                  <this.CompanyName>
                    {this.props.job
                      ? this.props.job.companyName
                      : "Company Title"}
                  </this.CompanyName>
                </this.CompanyLink>
              </Col>
              <Col md={4}>
                <this.ImageHolder img="https://mycareersdb.com/users/default/no_avatar_company.png">
                  <this.ScaleImage
                    src={
                      this.props.job
                        ? this.props.job.companyPhotoURL
                        : "https://mycareersdb.com/users/default/no_avatar_company.png"
                    }
                    thumbnail="thumbnail"
                  />
                </this.ImageHolder>
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
            {this.props.job.applied ? (
              <Button
                variant="outline-primary"
                block="block"
                disabled="disabled"
              >
                Already Applied!
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() =>
                  this.props.apply(
                    this.props.job.postKey,
                    this.props.id,
                    this.props.job.companyID
                  )
                }
                block="block"
              >
                Apply Now!
              </Button>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default SingleJobView;
