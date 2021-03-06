import React, { useContext, useState } from "react";

const EmployeeContext = React.createContext(null);

const defaultEmployee = {
   firstName: "",
   lastName: "",
   companyName: "",
   email: "",
   phoneNumber: null,
   department: "",
};

export function EmployeeProvider(props) {
   const [employee, setEmployee] = useState(defaultEmployee);

   const setDefaultEmployee = () => {
      setEmployee(defaultEmployee);
   };

   const contextValue = {
      employee,
      setEmployee,
      setDefaultEmployee,
   };

   return (
      <EmployeeContext.Provider value={contextValue}>
         {props.children}
      </EmployeeContext.Provider>
   );
}

export function useEmployee() {
   const context = useContext(EmployeeContext);
   return context;
}
