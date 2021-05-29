import React, { useState, useContext } from "react";

const VisitorContext = React.createContext(null);

const defaultVisitor = {
   firstName: "",
   lastName: "",
   phoneNumber: null,
   email: "",
   companyName: "",
   visitorType: "",
};

export function VisitorProvider(props) {
   const [visitor, setVisitor] = useState(defaultVisitor);

   const setDefaultVisitor = () => {
      setVisitor(defaultVisitor);
   };

   const contextValue = {
      visitor,
      setVisitor,
      setDefaultVisitor,
   };

   return (
      <VisitorContext.Provider value={contextValue}>
         {props.children}
      </VisitorContext.Provider>
   );
}

export function useVisitor() {
   const context = useContext(VisitorContext);
   return context;
}
