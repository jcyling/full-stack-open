import { useState, useEffect } from 'react'
import React from 'react'
import book from './services/book';

const Entry = ({ person, persons, setPersons }) => {

  const deleteEntry = (id) => {
    book.deleteEntry(id)
      .catch(error => {
        alert(error);
      })

    const updatedBook = persons.filter(item => item.id !== id)
    setPersons(updatedBook);
  }

  const handleDelete = (id) => {
    if (window.confirm("Delete?")) {
      console.log("Yes")
      deleteEntry(id)
    }
    else {
      console.log("No")
    }
  }

  return (
    <div>
      <span>{person.name}</span>
      <span> {person.number}</span>
      <button onClick={() => handleDelete(person.id)}>Delete</button>
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [searchStatus, setSearchStat] = useState(false)

  const hook = () => {
    book.getAll()
      .then(response => {
        setPersons(response);
      })
  }

  // Execute fetch at the first rendering
  useEffect(hook, []);

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
      const samePerson = persons.filter(person => person.name === newName)[0];

      const changedPerson = {
        ...samePerson,
        number: newNumber
      }

      const replaceMessage = `${newName} is already in phonebook, replace their number?`
      if (window.confirm(replaceMessage)) {
        book.update(samePerson.id, changedPerson)
          .then(returnedEntry =>
            setPersons(persons.map(
              person => person.id !== samePerson.id ? person : returnedEntry
            )))
          .catch(error =>
            alert(error)
          )
      }
      else { 
        return; 
      }
    }
    // If no existing entry found
    else {
      const lastPerson = persons.slice(-1)

      const personObject = {
        name: newName,
        number: newNumber,
        id: lastPerson.id + 1
      }

      setNewName('');
      setNewNumber('');

      book
        .create(personObject)
        .then(response =>
          setPersons(persons.concat(response))
        )
        .catch(error => {
          alert(error);
        })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchInput={handleSearchInput} />
      <h2>Add New Number</h2>
      <PersonForm addEntry={addEntry} newName={newName} newNumber={newNumber} handleNameInput={handleNameInput} handleNumberInput={handleNumberInput} />
      <h2>Numbers</h2>
      {entryDisplay.map(person =>
        <Entry person={person} persons={persons} setPersons={setPersons} key={person.id} />
      )}
    </div>
  )
}

export default App
