import Employee from "./Employee";
import React from "react";
import { Row, CardBody, Spinner } from "reactstrap";
import axios from "axios";
import { useQuery } from "react-query";

function Employees({ searchedEmployee }) {
   const { status, data, error } = useQuery("fetchEmployees", async () => {
      const { data } = await axios.get(`https://localhost:5001/api/employees/`);
      return data;
   });

   if (status === "error") {
      return (
         <CardBody className="scroll text-center text-danger">
            <b>{error.toString()}</b>
         </CardBody>
      );
   }

   if (status === "loading") {
      return (
         <CardBody className="scroll text-center">
            <Spinner color="primary" />
         </CardBody>
      );
   }

   const employeesFiltered =
      status === "loading" || status === "error"
         ? []
         : Object.values(data).filter((employee) => {
              const fullName = `${employee.firstName} ${employee.lastName}`;
              return NormalizeString(fullName).includes(
                 NormalizeString(searchedEmployee)
              );
           });

   if (status === "success" && employeesFiltered.length === 0) {
      return (
         <CardBody className="scroll text-center text-danger">
            <b>Aucun employée n'a été trouvé</b>
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

function NormalizeString(toNormalize) {
   return toNormalize
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
}
