import React from "react";

import { Route, Switch } from "react-router-dom"
import CreateTable from "../components/CreateTable"
import NotFound from "../../layout/NotFound";
function TableRoute() {

    return (

        <Switch>
            <Route path="/tables/new">
                <CreateTable />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    )

}







export default TableRoute