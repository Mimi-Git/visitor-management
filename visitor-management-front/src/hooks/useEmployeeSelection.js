import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEmployee } from "../contexts/employeeContext";
import { useVisitor } from "../contexts/visitorContext";
import useGetEmployees from "./employees/useGetEmployees";
import useCreateVisitor from "./visitors/useCreateVisitor";
import useCreateVisit from "./visits/useCreateVisit";
import useGetVisits from "./visits/useGetVisits";
import { useTranslation } from "react-i18next";

function useEmployeeSelection(searchedEmployee) {
   const history = useHistory();
   const { t } = useTranslation("employeeSelection");
   const messages = t("messages", { returnObjects: true });

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

   const employeesFiltered =
      queryGetEmployee.isLoading || queryGetEmployee.isError
         ? []
         : getEmployeesByNames(searchedEmployee);

   return {
      queryGetEmployee,
      employeesFiltered,
      messages,
      handleClick,
      mutationCreateVisitor,
      mutationCreateVisit,
      toggle,
      modal,
   };
}

export default useEmployeeSelection;
