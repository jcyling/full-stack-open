const express = require('express')
const app = express()

// Activate JSON parser
app.use(express.json())

let phonebook = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/phonebook', (request, response) => {
    response.json(phonebook)
})

app.get('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = phonebook.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const totalEntries = phonebook.length;
    const date = new Date()
    response.send(
        `
        <p>Phonebook has info for ${totalEntries} people.</p>
        <p>${date}</p>
        `
    )
})

app.post('/api/phonebook', (request,response) => {
    const newEntry = request.body;
    if (!newEntry) {
        return response.status(404).end()
    }
    else if (phonebook.filter(person => person.name == newEntry.name)) {
        return response.status(404).json({
            error: 'person already in phonebook'
        })
    }
    else if (!newEntry.name || !newEntry.number) {
        return response.status(404).json({
            error: 'name or number missing'
        })
    }
    else {
        const person = {
            id: rdnNum,
            name: newEntry.name,
            number: newEntry.number
        }
        phonebook = phonebook.concat(person)
        response.json(person)
    }
})

app.delete('/api/phonebook/:id', (request, response) => {
    const deletedEntry = Number(request.params.id);
    phonebook = phonebook.filter(person => person.id !== deletedEntry)
    response.status(204).end()
})

const rdnNum = Math.floor(Math.random() * 999);

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})