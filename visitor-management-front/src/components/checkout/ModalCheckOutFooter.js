import { Button, ModalFooter } from "reactstrap";
import { useHistory } from "react-router-dom";

function ModalCheckOutFooter({
   toggle,
   resetmutationUpdateVisit,
   refetchVisitorByEmail,
}) {
   const history = useHistory();

   const onRetry = () => {
      refetchVisitorByEmail();
      resetmutationUpdateVisit();
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

export default ModalCheckOutFooter;
