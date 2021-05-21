import React, { useContext, useState } from "react";

const EmployeeContext = React.createContext(null);

const defaultEmployee = {
   id: -1,
   firstName: "",
   lastName: "",
   companyName: "",
   email: "",
   phoneNumber: null,
   department: "",
};

export function EmployeeProvider(props) {
   const [employee, setEmployee] = useState(defaultEmployee);
   console.log(employee);

   const contextValue = {
      employee,
      setEmployee,
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
