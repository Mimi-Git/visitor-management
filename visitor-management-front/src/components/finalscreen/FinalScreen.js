import { useVisitor } from "../../contexts/visitorContext";
import { useEmployee } from "../../contexts/employeeContext";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

function FinalScreen() {
   const { setDefaultVisitor } = useVisitor();
   const { setDefaultEmployee } = useEmployee();

   const history = useHistory();
   const { t } = useTranslation("finalScreen");
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
               <h3>
                  {t("thanks")} {visitor.firstName} !
               </h3>
            </CardHeader>
            <CardBody>
               <h4 className="text-dark">
                  {t("registered")} {display === "checked-out" && t("out")}
                  {" !"}
               </h4>
               <h6 className="text-muted">
                  {display === "checked-in"
                     ? `${employee.firstName} ${employee.lastName} ${t(
                          "employeeArrivalNotif"
                       )}`
                     : t("seeYou")}
               </h6>
            </CardBody>
            <CardFooter>
               <Button size="lg" block color="success" onClick={handleClick}>
                  {t("nextVisitor")}{" "}
                  <FontAwesomeIcon icon={["fas", "chevron-right"]} />
               </Button>
            </CardFooter>
         </Card>
      </section>
   );
}

export default FinalScreen;
