import React from "react";

import { Route, Switch } from "react-router-dom"
import CreateTable from "../components/CreateTable"

function TableRoute() {

    return (

        <Switch>
            <Route path="/tables/new">
                <CreateTable />
            </Route>
        </Switch>
    )

}







export default TableRoute