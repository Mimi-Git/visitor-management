import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   Row,
   Col,
   Input,
   InputGroup,
   InputGroupAddon,
   InputGroupText,
   Card,
   CardHeader,
} from "reactstrap";
import Employees from "./Employees";
import GoBackButton from "../common/GoBackButton";

function EmployeeSelection() {
   const [searchedEmployee, setSearchedEmployee] = useState("");

   return (
      <section id="employee-selection">
         <EmployeesHeader setSearchedEmployee={setSearchedEmployee} />
         <EmployeesList searchedEmployee={searchedEmployee} />
      </section>
   );
}

function EmployeesList({ searchedEmployee }) {
   return (
      <Row className="mt-2 employees-row">
         <Col lg="9" className="mt-2">
            <Card style={{ color: "#212529" }}>
               <CardHeader tag="h2" className="text-center">
                  Personne visitée
               </CardHeader>
               <Employees searchedEmployee={searchedEmployee} />
            </Card>
         </Col>
      </Row>
   );
}

function EmployeesHeader({ setSearchedEmployee }) {
   return (
      <Row>
         <Col xs="3" sm="5" md="6" lg="7" xl="8">
            <GoBackButton size="lg" color="primary" />
         </Col>
         <Col xs="9" sm="7" md="6" lg="5" xl="4">
            <SearchEmployee setSearchedEmployee={setSearchedEmployee} />
         </Col>
      </Row>
   );
}

export default EmployeeSelection;

function SearchEmployee({ setSearchedEmployee }) {
   return (
      <InputGroup>
         <Input
            placeholder={"Rechercher"}
            name={"search"}
            aria-describedby={"search-addon"}
            autoComplete="off"
            bsSize={"lg"}
            onChange={(e) => setSearchedEmployee(e.target.value)}
         />
         <InputGroupAddon addonType="prepend">
            <InputGroupText id={"search-addon"}>
               <FontAwesomeIcon
                  icon={["fas", "search"]}
                  className="text-primary"
               />
            </InputGroupText>
         </InputGroupAddon>
      </InputGroup>
   );
}
