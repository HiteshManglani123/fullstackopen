// import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/person-form'
import personService from './services/persons'


const Header = ({ title }) => <h1>{title}</h1>

const Number = ( {person, deletePerson }) => {
  return (
    <>
      <p>{person.name} {person.phoneNumber}</p>
      <button onClick={() => deletePerson(person)}>delete</button>
    </>
  )
}

const Numbers = ({ deletePerson, persons, filterPerson }) => {
  
  const personsToShow = persons.filter(person => person.name.includes(filterPerson))
  return (
    <div>
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <Number deletePerson={deletePerson} person={person} key={person.id}/>)}
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
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('green')

  const Notification = ({message}) => {
    const notificationStyle = {
      color: `${color}`,
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'soild',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10 
    }
    if (message === null) {
      return null
    }
    
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, 
  [])

  const updatePhoneNumber = (id, name, phoneNumber) => {
    let result = window.confirm(`${name} is already in the phone book, replace the old number with a new one?`)
    if (result === true) {
      const samePerson = persons.find(tempPerson => id === tempPerson.id)
      const changedPerson = {...samePerson, phoneNumber: phoneNumber}
      personService
      .updatePerson(changedPerson)
      .then (changedPerson => {
        setPersons(persons.map(n => n.id !== id ? n : changedPerson))
        setMessage(`Updated ${newName}'s phoned number`)
        setColor('green')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewPhoneNumber('')
      })
      .catch((error) => {
        setMessage(error.response.data.error)
        setColor('red')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const deletePerson = (person) => {
    let result  = window.confirm(`You sure you want to delete ${person.name}?`)
    if (result) {
      
      personService
      .deletePerson(person)
      .then(() => {
        setPersons(persons.filter(tempPerson => person.id !== tempPerson.id))
      })
    }
  }

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
          updatePhoneNumber(persons[x].id, newName, newPhoneNumber)
          found = true;
          break
      }
    }
    if (!found) {
      const personObject = {
        name: newName,
        phoneNumber: newPhoneNumber
      }
      //post it
      //update state
      personService
      .createPerson(personObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setMessage(`Added ${newName}`)
        setColor('green')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        setNewName('')
        setNewPhoneNumber('')
      })
      .catch(error => {
        console.log(error.response.data.error);
        setMessage(error.response.data.error)
        setColor('red')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }
  return (
    <>
    <Notification message={message}/>
    <PhoneBook title="PhoneBook"/>
    <Filter onFilterChange={onFilterChange} filterPerson={filterPerson} />
    <Header title="Add a new" />
    <PersonForm updatePhoneNumber={updatePhoneNumber} addPerson={addPerson}  newName={newName} nameChange={onNameChange} newPhoneNumber={newPhoneNumber} onPhoneNumberChange={onPhoneNumberChange} />
    <Numbers deletePerson={deletePerson} persons={persons} filterPerson={filterPerson}/>
  </>
  )
   
}
  



export default App;
