import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";

export default class LoadingModal extends Component {
  CenteredBody = styled(Modal.Body)`
    margin-left: auto;
    margin-right: auto;
  `;
  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header>
          <Modal.Title>Loading...</Modal.Title>
        </Modal.Header>
        <this.CenteredBody>
          <span className="spinner-border" />
        </this.CenteredBody>
      </Modal>
    );
  }
}
