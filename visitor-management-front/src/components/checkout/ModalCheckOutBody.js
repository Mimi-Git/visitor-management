import { ModalBody, Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import AlertTemplate from "../common/AlertTemplate";
import { useTranslation } from "react-i18next";

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
         {GetBody(
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

function GetBody(
   queryGetVisitorByEmail,
   mutationUpdateVisit,
   updateVisit,
   redirectToFinalScreen,
   getCurrentVisit
) {
   const { t } = useTranslation("common");
   const messages = t("errors", { returnObjects: true });

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
            content={ErrorDisplay(
               queryGetVisitorByEmail,
               mutationUpdateVisit,
               messages
            )}
         />
      );
   }
   if (getVisitorByEmailSuccess) {
      let visitToUpdate = getCurrentVisit();

      let visitorIsVisiting = visitToUpdate !== undefined;

      if (!visitorIsVisiting && !mutationUpdateVisit.isSuccess) {
         return <AlertTemplate color="danger" content={messages.noVisit} />;
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
                  content={messages.dataSavedRedirect}
               />
            );
         }
      }
   }
}

function ErrorDisplay(queryGetVisitorByEmail, mutationUpdateVisit, messages) {
   var errorToDisplay = <></>;
   if (queryGetVisitorByEmail.isError) {
      if (queryGetVisitorByEmail.error.response?.status === 404) {
         errorToDisplay = <>{messages.unidentifiedEmail}</>;
      } else {
         errorToDisplay = (
            <>
               {messages.retrivalError}
               <br />
               {queryGetVisitorByEmail.error.toString()}
            </>
         );
      }
   }
   if (mutationUpdateVisit.isError) {
      errorToDisplay = (
         <>
            {messages.updateError}
            <br />
            {mutationUpdateVisit.error.toString()}
         </>
      );
   }
   return errorToDisplay;
}
