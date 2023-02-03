const knex = require("../db/connection")

async function create(table) {

    const [tableCreated] = await knex("tables").insert(table).returning("*")
    return tableCreated
}

async function list() {

    const tables = await knex("tables").select("*").orderBy("table_name", "asc")
    return tables
}



module.exports = {
    create,
    list
}