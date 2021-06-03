import Employee from "./Employee";
import React, { useState } from "react";
import { Row, CardBody, Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useEmployee } from "../../contexts/employeeContext";
import { useVisitor } from "../../contexts/visitorContext";
import useGetEmployees from "../../hooks/employees/useGetEmployees";
import useCreateVisitor from "../../hooks/visitors/useCreateVisitor";
import useCreateVisit from "../../hooks/visits/useCreateVisit";
import useGetVisits from "../../hooks/visits/useGetVisits";
import ModalCreationState from "./ModalCreationState";

function Employees({ searchedEmployee }) {
   const history = useHistory();

   const { setEmployee } = useEmployee();
   const { visitor, setVisitor } = useVisitor();

   const { queryGetEmployee, getEmployeesByNames } = useGetEmployees();
   const { mutationCreateVisitor } = useCreateVisitor();
   const { mutationCreateVisit, createVisit } = useCreateVisit();
   const { getCurrentVisitByVisitor } = useGetVisits();

   const [modal, setModal] = useState(false);
   const toggle = () => setModal(!modal);

   function handleClick(employeeSelected) {
      setEmployee(employeeSelected);
      setModal(true);

      if (visitorExists(visitor)) {
         addVisit(visitor, employeeSelected);
      } else {
         const newVisitor = visitor;
         if (newVisitor.phoneNumber === "") newVisitor.phoneNumber = null;

         mutationCreateVisitor.mutateAsync(newVisitor, {
            onSuccess: (data) => {
               setVisitor(data);
               addVisit(data, employeeSelected);
            },
         });
      }
   }

   const addVisit = (visitor, employee) => {
      if (visitorVisiting(visitor)) {
         setTimeout(() => history.push("/checkout"), 3000);
      } else {
         const dateNow = new Date().toJSON();

         const newVisit = {
            arrivalTime: dateNow,
            departureTime: dateNow,
            visitorId: visitor.id,
            employeeId: employee.id,
         };
         createVisit(newVisit).then(() =>
            setTimeout(() => {
               setModal(false);
               history.push("/finalscreen", {
                  display: "checked-in",
                  visitor,
                  employee,
               });
            }, 3000)
         );
      }
   };

   const visitorExists = (visitor) => "id" in visitor;

   const visitorVisiting = (visitor) =>
      getCurrentVisitByVisitor(visitor).length !== 0;

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

   const employeesFiltered =
      queryGetEmployee.isLoading || queryGetEmployee.isError
         ? []
         : getEmployeesByNames(searchedEmployee);

   if (queryGetEmployee.isSuccess && employeesFiltered.length === 0) {
      return (
         <CardBody className="scroll text-center text-danger">
            <b>{"Aucun employée n'a été trouvé"}</b>
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
