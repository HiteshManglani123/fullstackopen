import React from 'react'

const Input = ({ title, value, onChange }) => <> {title} : <input value={value} onChange={onChange}/> <br></br> <br></br> </>

const Button = ({ title }) => <><button type="submit">{title}</button></>

const PersonForm = ( {addPerson, newName, nameChange, newPhoneNumber, onPhoneNumberChange} ) => {
    return (
        <div>
            <form onSubmit={addPerson}>
            <div>
                <Input title="name" value={newName} onChange={nameChange}/>
                <Input title="phone number" value={newPhoneNumber} onChange={onPhoneNumberChange}/>
            </div>
            <div>
                <Button title="add"/>
            </div>
            </form>
        </div>
    )
}

export default PersonForm