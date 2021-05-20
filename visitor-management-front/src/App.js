import React from "react";
import Home from "./components/home/Home";
import VisitorCheck from "./components/visitorcheck/VisitorCheck";
import FirstVisit from "./components/firstVisit/FirstVisit";
import EmployeeSelection from "./components/employeeSelection/EmployeeSelection";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Route } from "react-router-dom";

library.add(fab, fas);

function App() {
   return (
      <>
         <Route path="/" exact component={Home} />
         <Route path="/visitorcheck" exact component={VisitorCheck} />
         <Route path="/firstvisit" exact component={FirstVisit} />
         <Route path="/employeeselection" exact component={EmployeeSelection} />
      </>
   );
}

export default App;
