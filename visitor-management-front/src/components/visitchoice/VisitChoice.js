import React from "react";
import GenericHeader from "../common/GenericHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useVisitor } from "../../contexts/visitorContext";

function VisitChoice() {
   return (
      <section id="visitor-check">
         <GenericHeader />
         <FirstOrReturnChoice />
      </section>
   );
}

export default VisitChoice;

function FirstOrReturnChoice() {
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
   const { setDefaultVisitor } = useVisitor();
   return (
      <Link to="/return">
         <Button
            size="lg"
            block
            color="primary"
            className="mt-3"
            onClick={setDefaultVisitor}
         >
            <span>
               <FontAwesomeIcon icon={["fas", "retweet"]} className="mr-2" />
            </span>
            <span>Déjà venu⸱e</span>
         </Button>
      </Link>
   );
}

function FirstVisitNav() {
   const { setDefaultVisitor } = useVisitor();
   return (
      <Link to="firstvisit">
         <Button size="lg" block color="primary" onClick={setDefaultVisitor}>
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
