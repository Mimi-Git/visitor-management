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

function ModalCreationState({
   isLoading,
   isError,
   isSuccess,
   errorMessage,
   toggle,
   modal,
}) {
   const body = getBody(isLoading, isError, isSuccess, errorMessage);

   return (
      <div>
         <Modal isOpen={modal}>
            <ModalHeader>{"Enregistement"}</ModalHeader>
            <ModalBody>{body}</ModalBody>
            {isError && <ModalFooterDisplay toggle={toggle} />}
         </Modal>
      </div>
   );
}

export default ModalCreationState;

function ModalFooterDisplay({ toggle }) {
   const history = useHistory();
   return (
      <ModalFooter>
         <Button
            color="primary"
            onClick={() => {
               toggle();
               history.push("/home");
            }}
         >
            {"Accueil"}
         </Button>{" "}
         <Button color="warning" onClick={toggle}>
            {"Rééssayer"}
         </Button>
      </ModalFooter>
   );
}

function getBody(isLoading, isError, isSuccess, errorMessage) {
   return isLoading ? (
      <div className="text-center">
         <Spinner size="sm" />
      </div>
   ) : isError ? (
      <Alert color="danger">
         Erreur lors de l'enregistrement !<br />
         {errorMessage}
      </Alert>
   ) : isSuccess ? (
      <Alert color="success">
         Enregistrement términé! Vous allez être redirigé...
      </Alert>
   ) : (
      "IDLE"
   );
}
