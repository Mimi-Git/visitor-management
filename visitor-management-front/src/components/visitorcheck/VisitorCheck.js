import React from "react";
import GenericHeader from "../common/GenericHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

function VisitorCheck() {
   return (
      <section id="visitor-check">
         <GenericHeader />
         <VisitorChoiceCheckin />
      </section>
   );
}

export default VisitorCheck;

function VisitorChoiceCheckin() {
   return (
      <Row className="visit-choice">
         <Col className="visit-type align-self-center">
            <FirstVisitNav />
            <ReturnVisitNav />
         </Col>
      </Row>
   );
}

function ReturnVisitNav() {
   return (
      <Link to="/returnvisit">
         <Button size="lg" block color="primary" className="mt-3">
            <span>
               <FontAwesomeIcon icon={["fas", "retweet"]} className="mr-2" />
            </span>
            <span>Déjà venu⸱e</span>
         </Button>
      </Link>
   );
}

function FirstVisitNav() {
   return (
      <Link to="firstvisit">
         <Button size="lg" block color="primary">
            <span>
               <FontAwesomeIcon
                  icon={["fas", "sign-in-alt"]}
                  className="mr-2"
               />
            </span>
            <span>Première visite</span>
         </Button>
      </Link>
   );
}
