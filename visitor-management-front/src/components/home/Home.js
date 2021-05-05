import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {Button, Col, Row} from 'reactstrap';
import DateTime from '../common/DateTime';
import { Languages } from '../common/Languages';

const Home = (props) =>
{
    return(
        <div id="home">
            <Row className="header">
                <Col><DateTime /></Col>
                <Col className="text-right"><Languages /></Col>
            </Row>            
            <Row className="greetings">
                <Col className="align-self-center text-center">                
                    <h1 className="h1 pb-4">Bienvenue dans notre entreprise</h1>
                    <Button size="lg" color="success">S'enregistrer <span><FontAwesomeIcon icon={["fas","chevron-circle-right"]}/></span></Button>
                </Col>
            </Row>
            <div className="footer-visit">
                <div className="d-inline mr-3">
                    <span><FontAwesomeIcon icon={["fas","door-open"]} size="2x"/></span>
                    <span>Sortie</span>
                </div>
                <div className="d-inline">                    
                    <span><FontAwesomeIcon icon={["fas","retweet"]} size="2x"/></span>
                    <span>Déjà venu.e</span>
                </div>
            </div>
        </div>
    )
}

export {Home};