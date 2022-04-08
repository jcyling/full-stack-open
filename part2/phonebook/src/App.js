import { useState } from 'react'

import React from 'react'

const Entry = ({ person }) => {
  return (
    <div>
      <span>{person.name}</span>
      <span> {person.number}</span>
    </div>
  )
}

const Filter = ({ newSearch, handleSearchInput }) => {
  return (
    <div>
      <div>Filter names: <input value={newSearch} onChange={handleSearchInput} /></div>
    </div>
  )
}

const PersonForm = ({ addEntry, newName, newNumber, handleNameInput, handleNumberInput }) => {
  return (
    <form onSubmit={addEntry}>
      <div>
        name: <input value={newName} onChange={handleNameInput} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberInput} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '18938193', id: 1 },
    { name: 'John Smith', number: '19242302', id: 2 },
    { name: 'Racocoonie', number: '19242302', id: 3 },

  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [searchStatus, setSearchStat] = useState(false)

  const handleSearchInput = (event) => {
    if (event.target.value.length > 0) {
      // Update search term if input entered
      setSearchStat(true);
      setNewSearch(event.target.value)
    }
    else {
      // Remove active search status if input is empty
      setNewSearch('');
      setSearchStat(false);
    }
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const searchEntries = (person) => {
    const newSearchLowercase = newSearch.toLowerCase();
    const personNameLowercase = person.name.toLowerCase();
    if (personNameLowercase.includes(newSearchLowercase)) {
      return person;
    }
  }

  const entryDisplay = searchStatus ?
    persons.filter(person => searchEntries(person)) : persons;


  const addEntry = (event) => {
    event.preventDefault();
    // If newName is found in object, give alert
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in phonebook!`)
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchInput={handleSearchInput} />
      <h2>Add New Number</h2>
      <PersonForm addEntry={addEntry} ewName={newName} newNumber={newNumber} handleNameInput={handleNameInput} handleNumberInput={handleNumberInput} />
      <h2>Numbers</h2>
      {entryDisplay.map(person =>
        <Entry person={person} key={person.id} />
      )}
    </div>
  )
}

export default App
