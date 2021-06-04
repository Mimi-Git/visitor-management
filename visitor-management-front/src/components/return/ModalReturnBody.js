import { useEffect } from "react";
import { ModalBody, Spinner } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import AlertTemplate from "../common/AlertTemplate";

function ModalReturnBody({ getVisitor, getCurrentVisit, toggle }) {
   const history = useHistory();

   if (getVisitor.isSuccess)
      var visitorIsVisiting = getCurrentVisit() !== undefined;

   let shouldRedirect = getVisitor.isSuccess && !visitorIsVisiting;

   useEffect(() => {
      if (shouldRedirect) {
         toggle();
         history.push("/employeeSelection");
      }
   }, [shouldRedirect, toggle, history]);

   return <ModalBody>{getBody(getVisitor, getCurrentVisit)}</ModalBody>;
}

export default ModalReturnBody;

function getBody(getVisitor, getCurrentVisit) {
   if (getVisitor.isLoading) {
      return (
         <div className="text-center">
            <Spinner />
         </div>
      );
   }
   if (getVisitor.isError) {
      let errorToDisplay = <></>;
      if (getVisitor.error.response?.status === 404) {
         errorToDisplay = (
            <>{"Aucune adresse mail ne correspond à celle saisie !"}</>
         );
      } else {
         errorToDisplay = (
            <>
               {"Erreur de récupération des données !"}
               <br />
               {getVisitor.error.toString()}
            </>
         );
      }
      return <AlertTemplate color={"danger"} content={errorToDisplay} />;
   }
   if (getVisitor.isSuccess) {
      let visitToUpdate = getCurrentVisit();

      var visitorIsVisiting = visitToUpdate !== undefined;

      if (visitorIsVisiting) {
         return (
            <AlertTemplate
               color="danger"
               content={
                  <>
                     {"Une visite est en cours. Veuillez effectuer la "}
                     <Link to="/checkout">
                        <b>{"sortie ici"}</b>
                     </Link>
                  </>
               }
            />
         );
      }
   }
}
