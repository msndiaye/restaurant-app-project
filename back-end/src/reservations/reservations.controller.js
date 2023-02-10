/**
 * List handler for reservation resources
 */

const moment = require("moment")
const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBound")

function dataExists(req, res, next) {
  const { data } = req.body
  if (!data) {
    return next({
      status: 400
    })
  }
  next()
}



function firstNameExists(req, res, next) {
  const { data: { first_name } = {} } = req.body
  if (!first_name) {
    return next({
      status: 400,
      message: "Please enter first_name"
    })
  }
  next()
}



function lastNameExists(req, res, next) {
  const { data: { last_name } = {} } = req.body
  if (!last_name) {
    return next({
      status: 400,
      message: "Please enter last_name"
    })
  }
  next()
}



function mobileNumberExists(req, res, next) {
  const { data: { mobile_number } = {} } = req.body

  if (!mobile_number) {
    return next({
      status: 400,
      message: "Please enter mobile_number"
    })
  }

  next()
}


function reservationDateExists(req, res, next) {
  const { data: { reservation_date } = {} } = req.body
  const isDateValid = moment(reservation_date, "YYYY-MM-DD", true).isValid(); // this will check if the date is in valid format
  if (!reservation_date) {
    return next({
      status: 400,
      message: "Please provide a reservation_date"
    })
  }
  if (!isDateValid) {
    return next({
      status: 400,
      message: "is not a valid reservation_date YYYY-MM-DD"
    })
  }
  next()

}



function daysWhenIsOperational(req, res, next) {
  const { data: { reservation_date } = {} } = req.body
  const currentDate = moment(reservation_date, "YYYY-MM-DD").format('dddd')
  const pastDate = moment(reservation_date, "YYYY-MM-DD").isBefore(moment().format("YYYY-MM-DD"))
  if (currentDate === "Tuesday") {
    return next({
      status: 400,
      message: "The reservation date is a Tuesday as the restaurant is closed on Tuesdays."
    })
  }

  if (pastDate) {
    return next({
      status: 400,
      message: "The reservation date is in the past. Only future reservations are allowed."
    })
  }

  next()

}


function timeWhenIsOperational(req, res, next) {
  const { data: { reservation_time } = {} } = req.body

  const openTime = moment("10:29", "HH:mm")
  const beforeClosedTime = moment("21:29", "HH:mm")
  const reservationTime = moment(reservation_time, "HH:mm") //24h
  const validReservationTime = reservationTime.isBetween(openTime, beforeClosedTime)

  if (validReservationTime) {
    return next()
  }

  next({
    status: 400,
    message: "the reservation_time is between 10:30am to 21:30pm"
  })






}




function reservationTimeExists(req, res, next) {
  const { data: { reservation_time } = {} } = req.body
  const isTimeValid = moment(reservation_time, 'hh:mm').isValid() // this will check if the time is in valid format
  if (!reservation_time) {
    return next({
      status: 400,
      message: "Please  provide reservation_time"
    })
  }

  if (!isTimeValid) {
    return next({
      status: 400,
      message: "Please provide a valid reservation_time"
    })

  }
  next()
}



function peopleExists(req, res, next) {
  const { data: { people } = {} } = req.body
  if (people === undefined) {
    return next({
      status: 400,
      message: "Please provide the number of people"
    })
  }

  if (people <= 0) {
    return next({
      status: 400,
      message: "Please provide the number of people greater than 0"
    })
  }

  if (typeof people !== "number" || !people) {
    return next({
      status: 400,
      message: "The number of people must be an integer greater than 0"
    })

  }


  next()
}


async function create(req, res) {

  const { data: { people } } = req.body

  req.body.data.people = Number(people)
  const reservation = await service.create(req.body.data)
  res.status(201).json({
    data: reservation
  })

}

async function list(req, res) {


  const { mobile_number, date: defaultDate, reservationDate } = req.query

  if (mobile_number) {
    const reservations = await service.search(mobile_number)
    res.json({
      data: reservations
    })
  } else {
    const listByDate = defaultDate || reservationDate
    let reservations = await service.list(listByDate)

    // im converting the date and time from the database to a more readable format
    reservations = reservations.filter(({ status }) => status !== "finished")
      .map((reservation) => {
        const { reservation_date, reservation_time } = reservation

        return {
          ...reservation,
          reservation_date: moment(reservation_date).format("MM-DD-YYYY"),
          reservation_time: moment(reservation_time, "HH:mm").format("hh:mm A")

        }
      })
    // 
    res.json({
      data: reservations,
    });
  }
}


async function reservationExists(req, res, next) {
  const { reservation_id } = req.params

  const reservation = await service.read(Number(reservation_id))
  if (reservation) {
    res.locals.reservation = reservation
    return next()
  }

  next({
    status: 404,
    message: `reservation_id ${reservation_id} cannot be found`
  })

}


function validStatusExists(req, res, next) {
  const { data: { status = "booked" } = {} } = req.body
  if (status === "booked") {
    return next()
  }
  next({
    status: 400,
    message: `The reservation status ${status} is not allowed`
  })
}

function unkownStatusExists(req, res, next) {
  const { data: { status } = {} } = req.body
  if (status === "unknown") {
    return next({
      status: 400,
      message: "The status unknown is not allowed"
    })
  }
  next()
}

function finishedStatusExists(req, res, next) {
  const { reservation: { status } } = res.locals
  if (status === "finished") {
    return next({
      status: 400,
      message: "The reservation is finished,it cannot be updated"
    })
  }
  next()
}


async function update(req, res) {
  const { data: { status } = {} } = req.body
  const { reservation_id } = req.params

  const reservation = await service.update(Number(reservation_id), status)


  // console.log("reservation", reservation)
  res.json({
    data: reservation
  })

}


function read(req, res) {
  const { reservation } = res.locals

  res.json({
    data: reservation
  })
}





module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
  create: [dataExists, firstNameExists, lastNameExists, mobileNumberExists, reservationDateExists, daysWhenIsOperational, reservationTimeExists, timeWhenIsOperational, peopleExists, validStatusExists, asyncErrorBoundary(create)],
  update: [asyncErrorBoundary(reservationExists), unkownStatusExists, finishedStatusExists, asyncErrorBoundary(update)]
};
