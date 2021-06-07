import Employee from "./Employee";
import React from "react";
import { Row, CardBody, Spinner } from "reactstrap";
import ModalCreationState from "./ModalCreationState";
import useEmployeeSelection from "../../hooks/useEmployeeSelection";

function Employees({ searchedEmployee }) {
   const {
      queryGetEmployee,
      employeesFiltered,
      messages,
      handleClick,
      mutationCreateVisitor,
      mutationCreateVisit,
      toggle,
      modal,
   } = useEmployeeSelection(searchedEmployee);

   if (queryGetEmployee.isError) {
      return (
         <CardBody className="scroll text-center text-danger">
            <b>{queryGetEmployee.error.toString()}</b>
         </CardBody>
      );
   }

   if (queryGetEmployee.isLoading) {
      return (
         <CardBody className="scroll text-center">
            <Spinner color="primary" />
         </CardBody>
      );
   }

   if (queryGetEmployee.isSuccess && employeesFiltered.length === 0) {
      return (
         <CardBody className="scroll text-center text-danger">
            <b>{messages.empty}</b>
         </CardBody>
      );
   }

   return (
      <>
         <CardBody className="scroll">
            <Row>
               {employeesFiltered.map((employee) => (
                  <Employee
                     key={employee.id}
                     employee={employee}
                     handleClick={handleClick}
                  />
               ))}
            </Row>
         </CardBody>
         <ModalCreationState
            isLoading={
               mutationCreateVisitor.isLoading || mutationCreateVisit.isLoading
            }
            isError={
               mutationCreateVisitor.isError || mutationCreateVisit.isError
            }
            isSuccess={mutationCreateVisit.isSuccess}
            errorMessage={
               mutationCreateVisitor.isError
                  ? mutationCreateVisitor.error.toString()
                  : mutationCreateVisit.isError
                  ? mutationCreateVisit.error.toString()
                  : ""
            }
            toggle={toggle}
            modal={modal}
         />
      </>
   );
}

export default Employees;
