import React from "react";
import GenericHeader from "../common/GenericHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useVisitor } from "../../contexts/visitorContext";
import { useTranslation } from "react-i18next";

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
   const { t } = useTranslation("common");
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
            <span>{t("returning")}</span>
         </Button>
      </Link>
   );
}

function FirstVisitNav() {
   const { setDefaultVisitor } = useVisitor();
   const { t } = useTranslation("common");
   return (
      <Link to="firstvisit">
         <Button size="lg" block color="primary" onClick={setDefaultVisitor}>
            <span>
               <FontAwesomeIcon
                  icon={["fas", "sign-in-alt"]}
                  className="mr-2"
               />
            </span>
            <span>{t("firstVisit")}</span>
         </Button>
      </Link>
   );
}
