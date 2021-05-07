import React from 'react';
import { Input, InputGroup, InputGroupAddon, InputGroupText, FormFeedback } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const InputText = (props) => {
    const {
        fieldName,
        icon,
        reg,
        placeholder,
        error,
        size
    } = props;

    const addon = `${fieldName}-addon`;

    return (
        <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
                <InputGroupText id={addon}>
                    <FontAwesomeIcon icon={icon} className="text-primary" />
                </InputGroupText>
            </InputGroupAddon>
            <Input {...reg}
                className={`${error ? 'is-invalid' : ''}`}
                placeholder={placeholder}
                name={fieldName}
                aria-describedby={addon}
                autoComplete="off"
                bsSize={size}
            />
            <FormFeedback>{error?.message}</FormFeedback>
        </InputGroup>
    )
}