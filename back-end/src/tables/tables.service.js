const knex = require("../db/connection")

async function create(table) {

    const [tableCreated] = await knex("tables").insert(table).returning("*")
    return tableCreated
}





module.exports = {
    create
}