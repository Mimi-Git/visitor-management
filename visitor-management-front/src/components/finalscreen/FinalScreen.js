import { useVisitor } from "../../contexts/visitorContext";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEmployee } from "../../contexts/employeeContext";

function FinalScreen() {
   const { visitor, setDefaultVisitor } = useVisitor();
   const { employee, setDefaultEmployee } = useEmployee();

   const history = useHistory();
   const display = history.location.state.display;

   const resetAppState = () => {
      setDefaultEmployee();
      setDefaultVisitor();
   };

   const handleClick = () => {
      resetAppState();
      history.push("/home");
   };

   return (
      <section
         id="final-screen"
         style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <Card>
            <CardHeader className="text-dark">
               <h2>Merci {visitor.firstName} !</h2>
            </CardHeader>
            <CardBody>
               <h3 className="text-dark">
                  Vous êtes maintenant enregistré{" "}
                  {display === "checked-out" && "comme sortant"}
                  {" !"}
               </h3>
               <h5 className="text-muted">
                  {display === "checked-in"
                     ? `${employee.firstName} ${employee.lastName} a été notifier de votre arrivée.`
                     : "A bientôt dans notre entreprise."}
               </h5>
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
