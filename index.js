const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))

var morgan = require('morgan')

//let persons = [ ]

console.log('...start...')

//app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :newperson'))

app.get('/health', (req, res) => {
  // throw 'error...'
  // eslint-disable-next-line no-unreachable
  res.send('ok')
})

app.get('/version', (req, res) => {
  res.send('7') // change this string to ensure a new version deployed
})

app.get('/info', (request, response) => {
  var d = new Date()
  Person.find({}).then(persons => {
    const respText = `phonebook has info for ${persons.length} people <br>  ${d}`
    response.send(respText)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

morgan.token('newperson', function(req) {
  var name = req.body.name
  var number = req.body.number
  const newperson = JSON.stringify( { 'name': name, 'number': number })
  return newperson
})

/*
const generateId = () => {
  id = Math.trunc(Math.random() * 1000000)
  return id
}
*/

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    //      mongoose.connection.close()
    })
    .catch(error => {
      next(error)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'person information missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number information missing'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
  }
  //////
  Person.findByIdAndUpdate(
    request.params.id,
    person,
    { new: true, runValidators: true, context: 'query' }
  )
  //////
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PHONEBOOK_PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

console.log('..end...')
