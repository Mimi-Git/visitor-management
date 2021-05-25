import React, { useState, useContext } from "react";

const VisitorContext = React.createContext(null);

const defaultVisitor = {
   firstname: "",
   lastname: "",
   phonenumber: "",
   email: "",
   company: "",
   visitortype: "",
};

export function VisitorProvider(props) {
   const [visitor, setVisitor] = useState(defaultVisitor);
   console.log(visitor);

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
