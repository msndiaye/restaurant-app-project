import { Route, Switch, Redirect } from "react-router-dom"
import ChooseSeat from "../components/ChooseSeat"
import CreateReservation from "../components/CreateReservation"


function ReservationsRoute() {

    return (
        <Switch>
            <Route path="/reservations" exact>
                <Redirect to={"/dashboard"} />
            </Route>
            <Route path="/reservations/new">
                <CreateReservation path="/reservations/:reservation_id/seat" />
            </Route>
            <Route>
                <ChooseSeat />
            </Route>
        </Switch>
    )
}

export default ReservationsRoute