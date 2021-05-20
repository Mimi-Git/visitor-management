import Employee from "./Employee";
import React from "react";
import { Row, CardBody, Spinner } from "reactstrap";
import useGetRequest, { REQUEST_STATUS } from "../hooks/useGetRequest";

function Employees({ setEmployee }) {
   const { data, requestStatus, error } = useGetRequest(`employees`);

   return (
      <CardBody className="scroll">
         {requestStatus === REQUEST_STATUS.FAILURE ? (
            <div className="text-center text-danger">
               <b>{error.toString()}</b>
            </div>
         ) : null}
         {requestStatus === REQUEST_STATUS.LOADING ? (
            <div className="text-center">
               <Spinner color="primary" />
            </div>
         ) : null}
         {data.length === 0 && requestStatus === REQUEST_STATUS.SUCCESS ? (
            <div className="text-center text-danger">
               <b>Pas d'employées dans la base</b>
            </div>
         ) : null}
         <Row>
            {Object.values(data).map((employee) => (
               <Employee
                  key={employee.id}
                  employee={employee}
                  setEmployee={setEmployee}
               />
            ))}
         </Row>
      </CardBody>
   );
}

export default Employees;
