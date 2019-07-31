import React, { Component } from 'react'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import Container from 'react-bootstrap/Container'
import { Col, Row } from 'react-bootstrap';

export default class App extends Component {


    render(){
        return (
            <Container fluid>
                <Row>
                    <Col xl={true} >
                        <Navbar />
                    </Col>
                </Row>
                <Row>
                    <Col xl={{ span: 6, offset: 3 }} >
                        <LoginForm />
                    </Col>
                </Row>
                
                

            </Container>
        )
    }
}