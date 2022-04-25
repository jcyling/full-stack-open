const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(404).send({ error: 'malformatted entry' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  errorHandler
}