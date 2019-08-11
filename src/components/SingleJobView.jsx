import React, { Component } from "react";
import { Form, Button, Container, Row, Card, Image } from "react-bootstrap";

class SingleJobView extends Component {
  render() {
    return (
      <div>
        <Card bg="light">
          <Card.Header>
            <Image
              src="https://mycareersdb.com/users/default/no_avatar_company.png"
              fluid="fluid"
            />
            <a>Company name here</a>
          </Card.Header>
          <Card.Body>
            <Card.Title>Example Job Title</Card.Title>
            <Card.Text>
              Example Job Description. As you can see I am purposely trying to
              make it go multiple lines, as a normal job description might do.
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}

export default SingleJobView;
