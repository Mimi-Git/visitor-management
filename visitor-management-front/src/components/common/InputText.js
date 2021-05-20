import React from "react";
import {
   Input,
   InputGroup,
   InputGroupAddon,
   InputGroupText,
   FormFeedback,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InputText(props) {
   const { fieldName, icon, reg, placeholder, error, size, defaultvalue } =
      props;

   const addon = `${fieldName}-addon`;

   return (
      <InputGroup className="mb-3">
         <InputGroupAddon addonType="prepend">
            <InputGroupText id={addon}>
               <FontAwesomeIcon icon={icon} className="text-primary" />
            </InputGroupText>
         </InputGroupAddon>
         <Input
            {...reg}
            className={`${error ? "is-invalid" : ""}`}
            placeholder={placeholder}
            name={fieldName}
            aria-describedby={addon}
            autoComplete="off"
            bsSize={size}
            defaultValue={defaultvalue}
         />
         <FormFeedback>{error?.message}</FormFeedback>
      </InputGroup>
   );
}

export default InputText;
