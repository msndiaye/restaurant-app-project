import React from "react";
import TableCard from "./TableCard"
function TablesCards({ tables, tablesError, removeTable }) {

    if (!tablesError) {

        return (
            <div>

                {tables.length ? <h3>Tables</h3> : null}

                {
                    tables.map(({ table_name, capacity, reservation_id, table_id }) => {
                        return <TableCard
                            key={table_id}
                            table_name={table_name}
                            capacity={capacity}
                            reservation_id={reservation_id}
                            table_id={table_id}
                            removeTable={removeTable}
                        />
                    })
                }
            </div>
        )


    } else {
        return null
    }



}



export default TablesCards