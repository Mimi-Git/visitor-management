import {
   Button,
   Modal,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Spinner,
   Alert,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ModalCreationState({
   isLoading,
   isError,
   isSuccess,
   errorMessage,
   toggle,
   modal,
}) {
   const { t } = useTranslation("employeeSelection");
   const body = GetBody(isLoading, isError, isSuccess, errorMessage);

   return (
      <div>
         <Modal isOpen={modal}>
            <ModalHeader>{t("modalHeader")}</ModalHeader>
            <ModalBody>{body}</ModalBody>
            {isError && <ModalFooterDisplay toggle={toggle} />}
         </Modal>
      </div>
   );
}

export default ModalCreationState;

function ModalFooterDisplay({ toggle }) {
   const history = useHistory();

   const { t } = useTranslation("employeeSelection");
   const messages = t("messages", { returnObjects: true });

   return (
      <ModalFooter>
         <Button
            color="primary"
            onClick={() => {
               toggle();
               history.push("/home");
            }}
         >
            {messages.home}
         </Button>{" "}
         <Button color="warning" onClick={toggle}>
            {messages.retry}
         </Button>
      </ModalFooter>
   );
}

function GetBody(isLoading, isError, isSuccess, errorMessage) {
   const { t } = useTranslation("employeeSelection");
   const messages = t("messages", { returnObjects: true });

   return isLoading ? (
      <div className="text-center">
         <Spinner size="sm" />
      </div>
   ) : isError ? (
      <Alert color="danger">
         {messages.registrationError}
         <br />
         {errorMessage}
      </Alert>
   ) : isSuccess ? (
      <Alert color="success">{messages.registrationCompleted}</Alert>
   ) : (
      "IDLE"
   );
}
