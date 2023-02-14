import React from "react";

import { Route, Switch } from "react-router-dom"
import NotFound from "../../layout/NotFound";
import CreateTable from "../components/CreateTable"
function TableRoute() {

    return (

        <Switch>
            <Route path="/tables/new" exact>
                <CreateTable />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    )

}







export default TableRoute