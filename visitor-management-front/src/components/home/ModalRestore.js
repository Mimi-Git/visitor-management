import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   Button,
   Modal,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Spinner,
} from "reactstrap";
import useRestoreData from "../../hooks/useRestoreData";
import { useTranslation } from "react-i18next";

function ModalRestore() {
   const { modal, toggle, onRestore, mutation } = useRestoreData();
   const { t } = useTranslation("home");

   return (
      <>
         <Button color="danger" onClick={toggle}>
            <FontAwesomeIcon icon={["fas", "minus-circle"]} />
         </Button>
         <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>{t("restoreTitle")}</ModalHeader>
            <ModalBody>{t("restoreBody")}</ModalBody>
            <ModalFooter>
               <Button
                  color={mutation.isSuccess ? "success" : "danger"}
                  disabled={!mutation.isIdle}
                  onClick={onRestore}
               >
                  {mutation.isLoading ? (
                     <Spinner size="sm" />
                  ) : mutation.isError ? (
                     t("error")
                  ) : mutation.isSuccess ? (
                     t("restored")
                  ) : (
                     t("restore")
                  )}
               </Button>{" "}
               <Button
                  color="secondary"
                  disabled={mutation.isLoading}
                  onClick={toggle}
               >
                  {mutation.isError || mutation.isSuccess
                     ? t("close")
                     : t("cancel")}
               </Button>
            </ModalFooter>
         </Modal>
      </>
   );
}

export default ModalRestore;
