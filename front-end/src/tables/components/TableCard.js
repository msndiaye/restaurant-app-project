import React from "react";





function TableCard({ table_name, capacity, reservation_id, table_id, removeTable }) {


    function modal() {

        if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
            removeTable(table_id, reservation_id)
        }
    }

    return (
        <>


            {reservation_id && <h3>Taken by reservation number:{reservation_id}</h3>
            }
            <br />

            <table className="table">
                <thead className="table-dark">
                    <tr>

                        <th scope="col">Table name</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row">{table_name}</td>
                        <td scope="row">{capacity}</td>
                        <td scope="row" data-table-id-status={table_id}>{reservation_id ? "occupied" : "free"}</td>
                    </tr>

                </tbody>
            </table>
            <br />
            <hr />
            <button type="button" className="btn btn-secondary"
                data-table-id-finish={table_id}
                onClick={modal}
            >Finish</button>
            <br />
            <br />
        </>
    )
}



export default TableCard