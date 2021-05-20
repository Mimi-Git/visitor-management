import React from "react";
import {
   Col,
   Row,
   Button,
   Form,
   Input,
   InputGroup,
   InputGroupAddon,
   InputGroupText,
   FormFeedback,
   Container,
   FormGroup,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputText from "../common/InputText";
import GoBackButton from "../common/GoBackButton";
import { useHistory } from "react-router-dom";
import useInputsFirstVisitProps from "../hooks/useInputsFirstVisitProps";
import useYup from "../hooks/useYup";

function FirstVisit({ visitor, setVisitor }) {
   const history = useHistory();
   const { register, handleSubmit, errors, reset } = useYup(visitor);
   const {
      firstNameProps,
      lastNameProps,
      phoneNumberProps,
      emailProps,
      companyProps,
      visitorTypeProps,
   } = useInputsFirstVisitProps(register, errors, visitor);

   const onSubmit = (data, e) => {
      e.preventDefault();
      setVisitor(data);
      history.push("/employeeselection");
   };

   return (
      <section id="first-visit">
         <GoBackButton size="lg" color="primary" />
         <div>
            <div className="text-center">
               <h2 className="h2 mt-3 mb-4">Vos coordonées, SVP</h2>
            </div>
         </div>
         <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
               <Row>
                  <Col md="6">
                     <InputText {...firstNameProps} />
                  </Col>
                  <Col md="6">
                     <InputText {...lastNameProps} />
                  </Col>
               </Row>
               <Row>
                  <Col md="5">
                     <InputText {...phoneNumberProps} />
                  </Col>
                  <Col md="7">
                     <InputText {...emailProps} />
                  </Col>
               </Row>
               <Row>
                  <Col md="6">
                     <InputText {...companyProps} />
                  </Col>
                  <Col md="6">
                     <VisitorTypeInputSelect
                        visitorTypeProps={visitorTypeProps}
                        visitor={visitor}
                     />
                  </Col>
               </Row>
               <FormGroup className="text-center">
                  <Button
                     size="lg"
                     id="submit-new"
                     type="submit"
                     color="success"
                  >
                     Suivant
                  </Button>
               </FormGroup>
            </Form>
         </Container>
      </section>
   );
}

export default FirstVisit;

function VisitorTypeInputSelect({ visitorTypeProps, visitor }) {
   return (
      <InputGroup className="mb-3">
         <InputGroupAddon addonType="prepend">
            <InputGroupText id={visitorTypeProps.fieldName + "-addon"}>
               <FontAwesomeIcon
                  icon={visitorTypeProps.icon}
                  className="text-primary"
               />
            </InputGroupText>
         </InputGroupAddon>
         <Input
            {...visitorTypeProps.reg}
            className={`${visitorTypeProps.error ? "is-invalid" : ""}`}
            name={visitorTypeProps.fieldName}
            aria-describedby={visitorTypeProps.fieldName + "-addon"}
            autoComplete="off"
            bsSize={visitorTypeProps.size}
            type="select"
            defaultValue={visitor.visitortype}
         >
            <option hidden value="">
               {visitorTypeProps.placeholder}
            </option>
            {Object.entries(visitorTypeProps.options).map(
               ([value, display]) => {
                  return (
                     <option key={value} value={value}>
                        {display}
                     </option>
                  );
               }
            )}
         </Input>
         <FormFeedback>{visitorTypeProps.error?.message}</FormFeedback>
      </InputGroup>
   );
}
