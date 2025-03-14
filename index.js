const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())
const cors = require('cors')

app.use(cors())
app.use(express.static('dist'))
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan('tiny'))
app.use(morgan(':body'))

const persons = {
    "persons": [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": "1"
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": "2"
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": "3"
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": "4"
      },
      {
        "name": "test",
        "number": "39-23-6423122",
        "id": "8"
      }
    ]
  }
  
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  
  app.post('/api/persons', (request, response) => {
    const person = request.body
    const name = person.name
    const number = person.number
    const nameExists = persons.persons.find(contact => contact.name === name)
    const nameMissing = name !== null && name !== ""
    const numberMissing = number !== null && number !== ""
    const canPost = !nameExists && nameMissing && numberMissing

    const errorMessage = nameExists ? "Somebody with this name already exists." : "Either the name or number are missing/empty."
    if(canPost){
        const newId = Math.floor(Math.random()*1000)
        person.id = String(newId)
        persons.persons = [...persons.persons, person];
        response.json(person)
    }else{
        response.status(404).json({ 
            error: errorMessage
        })
    }   
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.persons.find(person => person.id === id)
    persons.persons= persons.persons.map(person => person.id !== id)
    if (person) {
        response.json(`${person.name} has been deleted`)
      } else {
        response.status(404).end()
      }
  })

  app.get('/info', (request, response) => {
    const message = `Phonebook has info for ${persons.persons.length} people`
    const time= Date.now()
    response.send(`<h2>${message}</h2>, ${new Date(time)}`)
  })
  
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)