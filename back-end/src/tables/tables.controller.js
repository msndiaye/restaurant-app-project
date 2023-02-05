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

function reservationIdExists(req, res, next) {
    const { data: { reservation_id } = {} } = req.body
    if (!reservation_id) {
        return next({
            status: 400,
            message: "there is not a reservation_id"
        })
    }
    next()
}


async function reservationExists(req, res, next) {
    const { data: { reservation_id } = {} } = req.body
    const reservation = await service.readReservation(Number(reservation_id))
    if (reservation) {
        res.locals.reservation = reservation
        return next()
    }

    next({
        status: 404,
        message: `There is no reservation_id ${reservation_id}`
    })
}


async function enoughCapacity(req, res, next) {
    const { table_id } = req.params
    const { reservation: { people } } = res.locals
    const { capacity, reservation_id } = await service.readTable(Number(table_id))
    if (people <= capacity) {
        res.locals.reservation_id = reservation_id
        return next()
    }

    next({
        status: 400,
        message: "There is not enough capacity"
    })

}


async function isOccupied(req, res, next) {

    const { reservation_id } = res.locals

    if (reservation_id) {
        return next({
            status: 400,
            message: "the table is occupied"
        })
    }

    next()

}


async function update(req, res) {
    const { table_id } = req.params
    const { data: { reservation_id } = {} } = req.body
    const table = await service.update(Number(table_id), Number(reservation_id))
    res.json({
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
    list: asyncErrorBoundary(list),
    update: [dataExists, reservationIdExists, reservationExists,
        asyncErrorBoundary(enoughCapacity),
        asyncErrorBoundary(isOccupied),
        asyncErrorBoundary(update)]
}