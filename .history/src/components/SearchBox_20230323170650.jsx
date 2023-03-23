import React from 'react'

const SearchBox = ({ setUsername, fetchData }) => {
    const enterHandler = (e) => {
        if (e.key === 'Enter') {
            setUsername(e.target.value)
            e.target.value = ''
            fetchData()
        } 
    }

    return (
        <div  >
            <input type="text" id="search" name="search" placeholder='Search Username' onKeyDown={enterHandler} />
        </div>
    )
}

export default SearchBox