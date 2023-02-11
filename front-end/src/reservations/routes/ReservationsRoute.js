import { Route, Switch, Redirect } from "react-router-dom"
import Edit from "../../edit/Edit"
import Choosetables from "../../seats/ChooseTables"
import CreateReservation from "../components/CreateReservation"


function ReservationsRoute() {

    return (
        <Switch>
            <Route path="/reservations" exact>
                <Redirect to={"/dashboard"} />
            </Route>
            <Route path="/reservations/new">
                <CreateReservation />
            </Route>
            <Route path="/reservations/:reservation_id/seat">
                <Choosetables />
            </Route>
            <Route path="/reservations/:reservation_id/edit">
                <Edit />
            </Route>
        </Switch>
    )
}

export default ReservationsRoute