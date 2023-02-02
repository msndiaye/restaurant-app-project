import { Route, Switch, Redirect } from "react-router-dom"
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
        </Switch>
    )
}

export default ReservationsRoute