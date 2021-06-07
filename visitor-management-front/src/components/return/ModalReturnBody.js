import { useEffect } from "react";
import { ModalBody, Spinner } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import AlertTemplate from "../common/AlertTemplate";
import { useTranslation } from "react-i18next";

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

   return <ModalBody>{GetBody(getVisitor, getCurrentVisit)}</ModalBody>;
}

export default ModalReturnBody;

function GetBody(getVisitor, getCurrentVisit) {
   const { t } = useTranslation("common");
   const messages = t("errors", { returnObjects: true });

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
         errorToDisplay = <>{messages.unidentifiedEmail}</>;
      } else {
         errorToDisplay = (
            <>
               {messages.retrivalError}
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
                     {messages.visitInProgress}
                     <Link to="/checkout">
                        <b>{messages.exitHere}</b>
                     </Link>
                  </>
               }
            />
         );
      }
   }
}
