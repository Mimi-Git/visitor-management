import { ModalBody, Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import AlertTemplate from "../common/AlertTemplate";

function ModalCheckOutBody({
   queryGetVisitorByEmail,
   mutationUpdateVisit,
   updateVisit,
   toggle,
   getCurrentVisit,
}) {
   const history = useHistory();

   return (
      <ModalBody>
         {getBody(
            queryGetVisitorByEmail,
            mutationUpdateVisit,
            updateVisit,
            redirectToFinalScreen,
            getCurrentVisit
         )}
      </ModalBody>
   );

   function redirectToFinalScreen(visitor) {
      setTimeout(() => {
         toggle();
         history.push("/finalscreen", {
            display: "checked-out",
            visitor,
         });
      }, 3000);
   }
}

export default ModalCheckOutBody;

function getBody(
   queryGetVisitorByEmail,
   mutationUpdateVisit,
   updateVisit,
   redirectToFinalScreen,
   getCurrentVisit
) {
   var checkingOutLoading =
      queryGetVisitorByEmail.isLoading || mutationUpdateVisit.isLoading;
   var checkingOutError =
      queryGetVisitorByEmail.isError || mutationUpdateVisit.isError;
   var getVisitorByEmailSuccess = queryGetVisitorByEmail.isSuccess;

   if (checkingOutLoading) {
      return (
         <div className="text-center">
            <Spinner />
         </div>
      );
   }
   if (checkingOutError) {
      return (
         <AlertTemplate
            color={"danger"}
            content={ErrorDisplay(queryGetVisitorByEmail, mutationUpdateVisit)}
         />
      );
   }
   if (getVisitorByEmailSuccess) {
      let visitToUpdate = getCurrentVisit();

      let visitorIsVisiting = visitToUpdate !== undefined;

      if (!visitorIsVisiting && !mutationUpdateVisit.isSuccess) {
         return (
            <AlertTemplate color="danger" content={"Aucune visite en cours"} />
         );
      } else {
         if (!mutationUpdateVisit.isSuccess) {
            visitToUpdate.departureTime = new Date().toJSON();
            updateVisit(visitToUpdate).then(() =>
               redirectToFinalScreen(queryGetVisitorByEmail.data)
            );
         } else {
            return (
               <AlertTemplate
                  color="success"
                  content={"Données enregistrées, vous allez être redirigé..."}
               />
            );
         }
      }
   }
}

function ErrorDisplay(queryGetVisitorByEmail, mutationUpdateVisit) {
   var errorToDisplay = <></>;
   if (queryGetVisitorByEmail.isError) {
      if (queryGetVisitorByEmail.error.response?.status === 404) {
         errorToDisplay = (
            <>{"Aucune adresse mail ne correspond à celle saisie !"}</>
         );
      } else {
         errorToDisplay = (
            <>
               {"Erreur de récupération des données !"}
               <br />
               {queryGetVisitorByEmail.error.toString()}
            </>
         );
      }
   }
   if (mutationUpdateVisit.isError) {
      errorToDisplay = (
         <>
            {"Erreur de mise à jour des données !"}
            <br />
            {mutationUpdateVisit.error.toString()}
         </>
      );
   }
   return errorToDisplay;
}
