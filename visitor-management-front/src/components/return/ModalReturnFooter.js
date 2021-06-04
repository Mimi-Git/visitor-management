import { Button, ModalFooter } from "reactstrap";
import { useHistory } from "react-router-dom";

function ModalReturnFooter({ toggle, refetchVisitor }) {
   const history = useHistory();

   const onRetry = () => {
      refetchVisitor();
      toggle();
   };

   const onHome = () => {
      onRetry();
      history.push("/home");
   };

   return (
      <ModalFooter>
         <Button color="primary" onClick={onHome}>
            {"Accueil"}
         </Button>{" "}
         <Button color="warning" onClick={onRetry}>
            {"Rééssayer"}
         </Button>
      </ModalFooter>
   );
}

export default ModalReturnFooter;
