import { ModalBody, Spinner, Alert } from "reactstrap";
import { useHistory } from "react-router-dom";

function ModalCheckOutBody({
   queryGetVisitorByEmail,
   mutationUpdateVisit,
   updateVisit,
   toggle,
}) {
   const history = useHistory();

   return (
      <ModalBody>
         {getBody(
            queryGetVisitorByEmail,
            mutationUpdateVisit,
            updateVisit,
            redirectToFinalScreen
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
   redirectToFinalScreen
) {
   var checkingOutLoading =
      queryGetVisitorByEmail.isLoading || mutationUpdateVisit.isLoading;
   var checkingOutError =
      queryGetVisitorByEmail.isError || mutationUpdateVisit.isError;
   var getVisitorByEmailSuccess = queryGetVisitorByEmail.isSuccess;

   if (checkingOutLoading) {
      return <LoadingDisplay />;
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

      var visitorIsVisiting = visitToUpdate !== undefined;

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

   function getCurrentVisit() {
      return queryGetVisitorByEmail.data.visits.filter(
         (v) => v.arrivalTime === v.departureTime
      )[0];
   }
}

function LoadingDisplay() {
   return (
      <div className="text-center">
         <Spinner />
      </div>
   );
}

function AlertTemplate({ color, content }) {
   return <Alert color={color}>{content}</Alert>;
}

function ErrorDisplay(queryGetVisitorByEmail, mutationUpdateVisit) {
   var errorToDisplay = <></>;
   if (queryGetVisitorByEmail.isError) {
      if (queryGetVisitorByEmail.error.response?.status === 404) {
         errorToDisplay = (
            <>{"Aucune addresse mail ne correspond à celle saisie !"}</>
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
