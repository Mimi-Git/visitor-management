import { Modal, ModalHeader } from "reactstrap";
import usePutVisit from "../../hooks/visits/usePutVisit";
import useGetVisitorByEmail from "../../hooks/visitors/useGetVisitorByEmail";
import ModalCheckOutBody from "./ModalCheckOutBody";
import ModalCheckOutFooter from "./ModalCheckOutFooter";
import { useTranslation } from "react-i18next";

function ModalCheckOut({ toggle, modal, emailTyped }) {
   const { mutationUpdateVisit, updateVisit } = usePutVisit();
   const { queryGetVisitorByEmail, getCurrentVisit } =
      useGetVisitorByEmail(emailTyped);
   const { t } = useTranslation("checkOut");

   const visitUpdateSuccess =
      queryGetVisitorByEmail.isSuccess && mutationUpdateVisit.isSuccess;

   const visitIsLoading =
      queryGetVisitorByEmail.isLoading || mutationUpdateVisit.isLoading;

   if (emailTyped !== "" && queryGetVisitorByEmail.isIdle)
      queryGetVisitorByEmail.refetch();

   return (
      <Modal isOpen={modal}>
         <ModalHeader>{t("informationProcessing")}</ModalHeader>
         <ModalCheckOutBody
            queryGetVisitorByEmail={queryGetVisitorByEmail}
            mutationUpdateVisit={mutationUpdateVisit}
            updateVisit={updateVisit}
            toggle={toggle}
            getCurrentVisit={getCurrentVisit}
         />
         {!(visitUpdateSuccess || visitIsLoading) && (
            <ModalCheckOutFooter
               toggle={toggle}
               resetmutationUpdateVisit={mutationUpdateVisit.reset}
               refetchVisitorByEmail={queryGetVisitorByEmail.refetch}
            />
         )}
      </Modal>
   );
}

export default ModalCheckOut;
