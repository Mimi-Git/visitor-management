import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Row } from "reactstrap";
import DateTime from "../common/DateTime";
import ModalRestore from "./ModalRestore";
import { Languages } from "../common/Languages";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {
   return (
      <section id="home">
         <HomeHeader />
         <HomeGreetings />
         <HomeFooter />
      </section>
   );
}

export default Home;

function HomeGreetings() {
   const { t } = useTranslation("home");
   return (
      <Row className="greetings">
         <Col className="align-self-center text-center">
            <h1 className="h1 pb-4">{t("greet")}</h1>
            <Checkin />
         </Col>
      </Row>
   );
}

function Checkin() {
   const { t } = useTranslation("home");
   return (
      <Link to="/visitchoice">
         <Button size="lg" color="success">
            {t("checkin")}{" "}
            <span>
               <FontAwesomeIcon icon={["fas", "chevron-circle-right"]} />
            </span>
         </Button>
      </Link>
   );
}

function HomeFooter() {
   const { t } = useTranslation("home");
   return (
      <div className="footer">
         <div>
            <Link to="/checkout">
               <Button color="primary" className="mr-2">
                  <span>
                     <FontAwesomeIcon icon={["fas", "door-open"]} />
                  </span>
                  <span>{t("checkout")}</span>
               </Button>
            </Link>
            <Link to="/return">
               <Button color="primary">
                  <span>
                     <FontAwesomeIcon icon={["fas", "retweet"]} />
                  </span>
                  <span>{t("returning")}</span>
               </Button>
            </Link>
         </div>
         <div className="text-danger">
            <ModalRestore />
         </div>
      </div>
   );
}

function HomeHeader() {
   return (
      <Row>
         <Col>
            <DateTime />
         </Col>
         <Col className="text-right">
            <Languages />
         </Col>
      </Row>
   );
}
