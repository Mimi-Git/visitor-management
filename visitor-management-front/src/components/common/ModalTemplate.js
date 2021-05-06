import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const ModalTemplate = (props) => {
    const {
        buttonColor,
        buttonLabel,
        className,
        modalTitle,
        modalBody,
        modalYesLabel,
        modalNoLabel
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color={buttonColor} onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
                <ModalBody>
                    {modalBody}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={toggle}>{modalYesLabel}</Button>{' '}
                    <Button color="secondary" onClick={toggle}>{modalNoLabel}</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}