import Employee from "./Employee";
import React from "react";
import { Row, CardBody, Spinner } from "reactstrap";
import useGetEmployees from "../hooks/employees/useGetEmployees";

function Employees({ searchedEmployee }) {
   const { query, getEmployeesByNames } = useGetEmployees();

   if (query.isError) {
      return (
         <CardBody className="scroll text-center text-danger">
            <b>{query.error.toString()}</b>
         </CardBody>
      );
   }

   if (query.isLoading) {
      return (
         <CardBody className="scroll text-center">
            <Spinner color="primary" />
         </CardBody>
      );
   }

   const employeesFiltered =
      query.isLoading || query.isError
         ? []
         : getEmployeesByNames(searchedEmployee);

   if (query.isSuccess && employeesFiltered.length === 0) {
      return (
         <CardBody className="scroll text-center text-danger">
            <b>{"Aucun employée n'a été trouvé"}</b>
         </CardBody>
      );
   }

   return (
      <CardBody className="scroll">
         <Row>
            {employeesFiltered.map((employee) => (
               <Employee key={employee.id} employee={employee} />
            ))}
         </Row>
      </CardBody>
   );
}

export default Employees;
