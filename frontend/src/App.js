import { useState, useEffect } from 'react'

import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import personService from './services/personservice'

const InfoNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='info'>
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
    }, [errorMessage])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = (newFilter.length === 0)
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleDelete = (id) => {    
    const person = persons.find(p => p.id === id)
    //const deletedPerson = { ...person}

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deleteitem(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id ))
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName);
    if (person !== undefined) {
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with new one?`)) {
        const changedPerson = { ...person, number: newNumber }
        personService.update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
              setInfoMessage(
              `Updated ${returnedPerson.name}`
            )
            setTimeout(() => {
              setInfoMessage(null)
            }, 5000)
            setPersons(persons.map(person => person.name !== newName ? person : changedPerson))
            setNewName('')
            setNewNumber('')
            })
          .catch(error => {
            setErrorMessage(error.response.data.error)
////            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.name !== newName))
            setNewName('')
            setNewNumber('')
            })
        }  
      else {
        return
        }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService.create(personObject)
      .then(returnedPerson => {
        setInfoMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)

        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <InfoNotification message={infoMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter value={newFilter} onChange={handleFilterChange}  />

      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson}
          namevalue={newName} nameonChange={handleNameChange} 
          numbervalue={newNumber} numberonChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} onClick={handleDelete}/>
    </div>
  )
}

export default App