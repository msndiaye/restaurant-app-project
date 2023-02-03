import React from "react";


function TableCard({ table_name, capacity, reservation_id, table_id }) {

    return (
        <>
            <h3 style={{ textAlign: "center" }}>Table# {table_id}</h3>
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
            <br />
        </>
    )
}



export default TableCard