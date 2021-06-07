import { Button, ModalFooter } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ModalCheckOutFooter({
   toggle,
   resetmutationUpdateVisit,
   refetchVisitorByEmail,
}) {
   const history = useHistory();
   const { t } = useTranslation("common");

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
            {t("home")}
         </Button>{" "}
         <Button color="warning" onClick={onRetry}>
            {t("retry")}
         </Button>
      </ModalFooter>
   );
}

export default ModalCheckOutFooter;
