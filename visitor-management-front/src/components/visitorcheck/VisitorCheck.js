import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Row, Col } from 'reactstrap';
import { Languages } from '../common/Languages';

export const VisitorCheck = (props) => {

    return (
        <section id="visitor-check">
            <Row className="justify-content-between">
                <Col>
                    <Button size="lg" color="success"><FontAwesomeIcon icon={["fas", "chevron-left"]} /></Button>
                </Col>
                <Col className="text-right"><Languages /></Col>
            </Row>
            <Row className="visit-choice">
                <Col className="visit-type align-self-center">
                    <Button size="lg" block color="primary">
                        <span><FontAwesomeIcon icon={["fas", "sign-in-alt"]} className="mr-2" /></span>
                        <span>Première visite</span>
                    </Button>
                    <Button size="lg" block color="primary" className="mt-3">
                        <span><FontAwesomeIcon icon={["fas", "retweet"]} className="mr-2" /></span>
                        <span>Déjà venu⸱e</span>
                    </Button>
                </Col>
            </Row>
        </section>
    )
}