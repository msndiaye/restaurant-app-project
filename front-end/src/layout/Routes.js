import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
// import { today } from "../utils/date-time";
import ReservationsRoute from "../reservations/routes/ReservationsRoute";
import TableRoute from "../tables/routes/TableRoute";
import Search from "../search/components/Search";
/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations">
        {/* <Redirect to={"/dashboard"} /> */}
        <ReservationsRoute />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/tables">
        <TableRoute />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;


