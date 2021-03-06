import React from "react";
import Home from "./components/home/Home";
import VisitChoice from "./components/visitchoice/VisitChoice";
import FirstVisit from "./components/firstVisit/FirstVisit";
import EmployeeSelection from "./components/employeeSelection/EmployeeSelection";
import FinalScreen from "./components/finalscreen/FinalScreen";
import CheckOut from "./components/checkout/CheckOut";
import Return from "./components/return/Return";
import "./i18n";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Route, Switch } from "react-router-dom";

library.add(fab, fas);

function App() {
   return (
      <Switch>
         <Route path="/" exact>
            <Home />
         </Route>
         <Route path="/visitchoice" exact>
            <VisitChoice />
         </Route>
         <Route path="/firstvisit" exact>
            <FirstVisit />
         </Route>
         <Route path="/employeeselection" exact>
            <EmployeeSelection />
         </Route>
         <Route path="/finalscreen" exact>
            <FinalScreen />
         </Route>
         <Route path="/checkout" exact>
            <CheckOut />
         </Route>
         <Route path="/return" exact>
            <Return />
         </Route>
         <Route path="*">
            <Home />
         </Route>
      </Switch>
   );
}

export default App;
