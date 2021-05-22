import React from "react";
import ReactDOM from "react-dom";
import "./custom.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { VisitorProvider } from "./components/contexts/visitorContext";
import { EmployeeProvider } from "./components/contexts/employeeContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
   <React.Fragment>
      <BrowserRouter>
         <VisitorProvider>
            <EmployeeProvider>
               <QueryClientProvider client={queryClient}>
                  <App />
               </QueryClientProvider>
            </EmployeeProvider>
         </VisitorProvider>
      </BrowserRouter>
   </React.Fragment>,
   document.getElementById("root")
);
