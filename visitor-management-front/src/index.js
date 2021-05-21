import React from "react";
import ReactDOM from "react-dom";
import "./custom.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { VisitorProvider } from "./components/contexts/visitorContext";
import { EmployeeProvider } from "./components/contexts/employeeContext";

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <VisitorProvider>
            <EmployeeProvider>
               <App />
            </EmployeeProvider>
         </VisitorProvider>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
