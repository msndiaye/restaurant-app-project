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

async function update(reservation_id, status) {

    const [reservation] = await knex("reservations").update({ status }).where({ reservation_id }).returning("*")
    return reservation
}

async function search(mobile_number) {
    const reservations = await knex("reservations")
        .whereRaw(
            "translate(mobile_number, '() -', '') like ?",
            `%${mobile_number.replace(/\D/g, "")}%`
        )
        .orderBy("reservation_date");
    return reservations
}


async function updateReservation(reservation_id, data) {

    const [reservation] = await knex("reservations").update(data).where({ reservation_id }).returning("*")
    return reservation

}

module.exports = {
    create,
    list,
    read,
    update,
    search,
    updateReservation
}