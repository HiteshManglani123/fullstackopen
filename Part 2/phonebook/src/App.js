import React, { useState} from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const Number = ( {name, phoneNumber }) => {
  return (
    <>
      <p>{name} {phoneNumber}</p>
    </>
  )
}

const Numbers = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map(person => 
        <Number name={person.name} phoneNumber={person.phoneNumber} key={person.id}/>)}
    </div>
  )
}

const PhoneBook = ({ persons, title }) => {
  return (
    <div>
      <Header title={title}/>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', id: "1"},
    { name: 'Hitesh', id: "2"} 
  ])

  const onNameChange = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length + 1
    }
    console.log(personObject)
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const [newName, setNewName] = useState('')

  return (
    <>
    <PhoneBook persons={persons} title="PhoneBook"/>
    <form onSubmit={addName}>
      <div>
        name : <input value={newName}  onChange={onNameChange}/>
      </div>
      <div>
      <button type="submit">add</button>
      </div>
    </form>
    <Numbers persons={persons}/>
  </>
  )
   
}
  



export default App;
