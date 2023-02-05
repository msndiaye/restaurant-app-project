const knex = require("../db/connection")

async function create(table) {

    const [tableCreated] = await knex("tables").insert(table).returning("*")
    return tableCreated
}


async function readReservation(reservation_id) {
    const reservation = await knex("reservations").select("*").where({ reservation_id }).first()
    return reservation
}
async function list() {

    const tables = await knex("tables").select("*").orderBy("table_name", "asc")
    return tables
}

async function readTable(table_id) {
    const table = await knex("tables").select("*").where({ table_id }).first()
    return table
}

async function update(table_id, updated) {

    const [table] = await knex("tables").where({ table_id }).update({ reservation_id: updated }).returning("*")
    return table

}


async function removeTable(table_id) {
    await knex("tables").update({ reservation_id: null }).where({ table_id }).returning("*")
    const tables = await knex("tables").select("*")
    return tables

}

module.exports = {
    create,
    list,
    readReservation,
    readTable,
    update,
    removeTable
}