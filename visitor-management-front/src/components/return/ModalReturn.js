import { Modal, ModalHeader } from "reactstrap";
import useGetVisitorByEmail from "../../hooks/visitors/useGetVisitorByEmail";
import ModalReturnFooter from "./ModalReturnFooter";
import ModalReturnBody from "./ModalReturnBody";
import { useVisitor } from "../../contexts/visitorContext";

function ModalReturn({ toggle, modal, emailTyped }) {
   const { setVisitor } = useVisitor();
   const { queryGetVisitorByEmail: getVisitor, getCurrentVisit } =
      useGetVisitorByEmail(emailTyped);

   if (emailTyped !== "" && getVisitor.isIdle)
      getVisitor.refetch().then((res) => setVisitor(res.data));

   return (
      <Modal isOpen={modal}>
         <ModalHeader>{"Traitement des informations"}</ModalHeader>
         <ModalReturnBody
            getVisitor={getVisitor}
            toggle={toggle}
            getCurrentVisit={getCurrentVisit}
         />
         {getVisitor.isError && (
            <ModalReturnFooter
               toggle={toggle}
               refetchVisitor={getVisitor.refetch}
            />
         )}
      </Modal>
   );
}

export default ModalReturn;
