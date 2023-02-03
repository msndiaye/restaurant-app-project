const asyncErrorBoundary = require("../errors/asyncErrorBound")
const service = require("./tables.service")
function dataExists(req, res, next) {
    const { data } = req.body
    if (!data) {
        return next({
            status: 400
        })
    }
    next()
}

function tableNameExists(req, res, next) {
    const { data: { table_name } = {} } = req.body
    if (!table_name) {
        return next({
            status: 400,
            message: `Please provide table_name`
        })
    }
    next()
}

function tableNameCharterLength(req, res, next) {
    const { data: { table_name } = {} } = req.body
    if (table_name.length === 1) {
        return next({
            status: 400,
            message: `table_name length must two or more characters long`
        })
    }
    next()
}


function capacityExists(req, res, next) {
    const { data: { capacity } = {} } = req.body
    if (capacity === 0) {
        return next({
            status: 400,
            message: "the capacity must be one or greater"
        })
    }

    if (typeof capacity !== "number") {
        return next({
            status: 400,
            message: "the capacity must be a integer greater than or equal to one"
        })
    }

    if (!capacity) {
        return next({
            status: 400,
            message: "Please provide the host capacity"
        })
    }
    next()
}


async function create(req, res) {

    const table = await service.create(req.body.data)
    res.status(201).json({
        data: table
    })
}


async function list(req, res) {
    const tables = await service.list()
    res.json({
        data: tables
    })

}


module.exports = {
    create: [dataExists, tableNameExists, tableNameCharterLength, capacityExists, asyncErrorBoundary(create)],
    list: asyncErrorBoundary(list)
}