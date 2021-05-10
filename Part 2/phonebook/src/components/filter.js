import React from 'react'

const Filter = ({ onFilterChange, filterPerson}) => {
    return (
        <div>
           filter show with <input onChange={onFilterChange} value={filterPerson}/>
        </div>
    )
}

export default Filter