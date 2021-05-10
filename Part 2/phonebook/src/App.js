import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/person-form'
import axios from 'axios'

const Header = ({ title }) => <h1>{title}</h1>

const Number = ( {name, phoneNumber }) => {
  return (
    <>
      <p>{name} {phoneNumber}</p>
    </>
  )
}

const Numbers = ({ persons, filterPerson }) => {
  
  const personsToShow = persons.filter(person => person.name.includes(filterPerson))
  return (
    <div>
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <Number name={person.name} phoneNumber={person.phoneNumber} key={person.id}/>)}
    </div>
  )
}

const PhoneBook = ({ title }) => {
  return (
    <div>
      <Header title={title}/>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
    .then(response => {
      setPersons(response.data)
      // setPersons(response)
    })
  }, [])

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')

  const onFilterChange = (event) => {
    setFilterPerson(event.target.value)
  }

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onPhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    let found = false
    for(let x = 0; x < persons.length; x++) {
        if (persons[x].name === newName) {
          alert(`${newName} is already added to the phonebook`)
          found = true;
          break
      }
    }
    if (!found) {
      const personObject = {
        name: newName,
        phoneNumber: newPhoneNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewPhoneNumber('')
    }
  }
  return (
    <>
    <PhoneBook title="PhoneBook"/>
    <Filter onFilterChange={onFilterChange} filterPerson={filterPerson} />
    <Header title="Add a new" />
    <PersonForm addPerson={addPerson}  newName={newName} nameChange={onNameChange} newPhoneNumber={newPhoneNumber} onPhoneNumberChange={onPhoneNumberChange} />
    <Numbers persons={persons} filterPerson={filterPerson}/>
  </>
  )
   
}
  



export default App;
