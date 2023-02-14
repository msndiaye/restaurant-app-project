import { Route, Switch, Redirect } from "react-router-dom"
import Edit from "../../edit/Edit"
import Choosetables from "../../seats/ChooseTables"
import CreateReservation from "../components/CreateReservation"
import NotFound from "../../layout/NotFound"
function ReservationsRoute() {

    return (
        <Switch>
            <Route path="/reservations" exact>
                <Redirect to={"/dashboard"} />
            </Route>
            <Route path="/reservations/new" exact>
                <CreateReservation />
            </Route>
            <Route path="/reservations/:reservation_id/seat" exact>
                <Choosetables />
            </Route>
            <Route path="/reservations/:reservation_id/edit" exact>
                <Edit />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    )
}

export default ReservationsRoute