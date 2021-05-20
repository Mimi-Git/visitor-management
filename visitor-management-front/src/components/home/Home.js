import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Row } from "reactstrap";
import DateTime from "../common/DateTime";
import { ModalTemplate } from "../common/ModalTemplate";
import { Languages } from "../common/Languages";
import { Link } from "react-router-dom";

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
   return (
      <Row className="greetings">
         <Col className="align-self-center text-center">
            <h1 className="h1 pb-4">Bienvenue dans notre entreprise</h1>
            <Checkin />
         </Col>
      </Row>
   );
}

function Checkin() {
   return (
      <Link to="/visitorcheck">
         <Button size="lg" color="success">
            S'enregistrer{" "}
            <span>
               <FontAwesomeIcon icon={["fas", "chevron-circle-right"]} />
            </span>
         </Button>
      </Link>
   );
}

function HomeFooter() {
   const restoreData = {
      buttonColor: "danger",
      buttonLabel: <FontAwesomeIcon icon={["fas", "minus-circle"]} />,
      className: "test",
      modalTitle: "Etes-vous sûr⸱e ? (Démo uniquement)",
      modalBody:
         "Voulez-vous vraiment restaurer les données de l'application ? Cela aura pour conséquense de supprimer tous les visiteurs, visites et de reinitialiser les employés par défaut.",
      modalYesLabel: "Restaurer",
      modalNoLabel: "Annuler",
   };

   return (
      <div className="footer">
         <div>
            <Link to="/checkout">
               <Button color="primary" className="mr-2">
                  <span>
                     <FontAwesomeIcon icon={["fas", "door-open"]} />
                  </span>
                  <span>Sortie</span>
               </Button>
            </Link>
            <Link to="/return">
               <Button color="primary">
                  <span>
                     <FontAwesomeIcon icon={["fas", "retweet"]} />
                  </span>
                  <span>Déjà venu⸱e</span>
               </Button>
            </Link>
         </div>
         <div className="text-danger">
            <ModalTemplate {...restoreData} />
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
