import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   Row,
   Col,
   Button,
   Input,
   InputGroup,
   InputGroupAddon,
   InputGroupText,
   Card,
   CardHeader,
} from "reactstrap";
import Employees from "./Employees";
import GoBackButton from "../common/GoBackButton";

function EmployeeSelection({ setEmployee }) {
   return (
      <section id="employee-selection">
         <EmployeesHeader />
         <EmployeesList setEmployee={setEmployee} />
      </section>
   );
}

function EmployeesList({ setEmployee }) {
   return (
      <Row className="mt-2 employees-row">
         <Col lg="9" className="mt-2">
            <Card style={{ color: "#212529" }}>
               <CardHeader tag="h2" className="text-center">
                  Personne visitée
               </CardHeader>
               <Employees setEmployee={setEmployee} />
            </Card>
         </Col>
      </Row>
   );
}

function EmployeesHeader() {
   return (
      <Row>
         <Col xs="3" sm="5" md="6" lg="7" xl="8">
            <GoBackButton size="lg" color="primary" />
         </Col>
         <Col xs="9" sm="7" md="6" lg="5" xl="4">
            <InputGroup>
               <Input
                  placeholder={"Rechercher"}
                  name={"search"}
                  aria-describedby={"search-addon"}
                  autoComplete="off"
                  bsSize={"lg"}
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
         </Col>
      </Row>
   );
}

export default EmployeeSelection;
