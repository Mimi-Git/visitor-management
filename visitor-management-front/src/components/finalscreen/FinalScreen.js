import { useVisitor } from "../../contexts/visitorContext";
import { useEmployee } from "../../contexts/employeeContext";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FinalScreen() {
   const { setDefaultVisitor } = useVisitor();
   const { setDefaultEmployee } = useEmployee();

   const history = useHistory();
   const display = history.location.state.display;
   const visitor = history.location.state.visitor;
   const employee = history.location.state.employee;

   function resetAppState() {
      setDefaultEmployee();
      setDefaultVisitor();
   }

   function handleClick() {
      resetAppState();
      history.push("/home");
   }

   return (
      <section id="final-screen">
         <Card>
            <CardHeader className="text-dark">
               <h3>Merci {visitor.firstName} !</h3>
            </CardHeader>
            <CardBody>
               <h4 className="text-dark">
                  Vous êtes maintenant enregistré{" "}
                  {display === "checked-out" && "comme sortant"}
                  {" !"}
               </h4>
               <h6 className="text-muted">
                  {display === "checked-in"
                     ? `${employee.firstName} ${employee.lastName} a été notifié de votre arrivée.`
                     : "A bientôt dans notre entreprise."}
               </h6>
            </CardBody>
            <CardFooter>
               <Button size="lg" block color="success" onClick={handleClick}>
                  Visiteur suivant{" "}
                  <FontAwesomeIcon icon={["fas", "chevron-right"]} />
               </Button>
            </CardFooter>
         </Card>
      </section>
   );
}

export default FinalScreen;
