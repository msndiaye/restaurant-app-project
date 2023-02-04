const knex = require("../db/connection")
const db = require("../db/connection")

async function create(reservation) {
    const [reservationCreated] = await db("reservations").insert(reservation).returning("*")
    return reservationCreated

}


async function list(date) {
    const reservations = await db("reservations").select("*").where({ reservation_date: date }).orderBy('reservation_time', 'asc')
    return reservations

}

async function read(reservation_id) {

    const reservation = await knex("reservations").select("*").where({ reservation_id }).first()
    return reservation
}

module.exports = {
    create,
    list,
    read
}