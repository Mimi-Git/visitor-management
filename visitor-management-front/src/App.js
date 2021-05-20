import React, { useState } from "react";
import Home from "./components/home/Home";
import VisitorCheck from "./components/visitorcheck/VisitorCheck";
import FirstVisit from "./components/firstVisit/FirstVisit";
import EmployeeSelection from "./components/employeeSelection/EmployeeSelection";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Route, Switch } from "react-router-dom";

library.add(fab, fas);

const defaultVisitor = {
   firstname: "",
   lastname: "",
   phonenumber: "",
   email: "",
   company: "",
   visitortype: "",
};

const defaultEmployee = {
   id: -1,
   firstName: "",
   lastName: "",
   companyName: "",
   email: "",
   phoneNumber: null,
   department: "",
};

function App() {
   const [visitor, setVisitor] = useState(defaultVisitor);
   const [employee, setEmployee] = useState(defaultEmployee);

   console.log(visitor);
   console.log(employee);

   return (
      <Switch>
         <Route path="/" exact>
            <Home />
         </Route>
         <Route path="/visitorcheck" exact>
            <VisitorCheck />
         </Route>
         <Route path="/firstvisit" exact>
            <FirstVisit visitor={visitor} setVisitor={setVisitor} />
         </Route>
         <Route path="/employeeselection" exact>
            <EmployeeSelection setEmployee={setEmployee} />
         </Route>
         <Route path="*">
            <Home />
         </Route>
      </Switch>
   );
}

export default App;
