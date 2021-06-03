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

function ModalRestore() {
   const { modal, toggle, onRestore, mutation } = useRestoreData();

   return (
      <>
         <Button color="danger" onClick={toggle}>
            <FontAwesomeIcon icon={["fas", "minus-circle"]} />
         </Button>
         <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
               {"Etes-vous sûr⸱e ? (Démo uniquement)"}
            </ModalHeader>
            <ModalBody>
               {
                  "Voulez-vous vraiment restaurer les données de l'application ? Cela aura pour conséquense de supprimer tous les visiteurs, visites et de reinitialiser les employés par défaut."
               }
            </ModalBody>
            <ModalFooter>
               <Button
                  color={mutation.isSuccess ? "success" : "danger"}
                  disabled={!mutation.isIdle}
                  onClick={onRestore}
               >
                  {mutation.isLoading ? (
                     <Spinner size="sm" />
                  ) : mutation.isError ? (
                     "Erreur !"
                  ) : mutation.isSuccess ? (
                     "Restauré !"
                  ) : (
                     "Restaurer"
                  )}
               </Button>{" "}
               <Button
                  color="secondary"
                  disabled={mutation.isLoading}
                  onClick={toggle}
               >
                  {mutation.isError || mutation.isSuccess
                     ? "Fermer"
                     : "Annuler"}
               </Button>
            </ModalFooter>
         </Modal>
      </>
   );
}

export default ModalRestore;
