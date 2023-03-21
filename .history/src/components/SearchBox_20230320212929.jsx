import React from 'react'

const SearchBox = ({ setUsername }) => {
    const enterHandler = (e) => {
        if (e.key === 'Enter') {
            setUsername(e.target.value)
            e.target.value = ''
        } 
    }

    return (
        <div  >
            <input type="text" id="search" name="search" placeholder='Search Username' onKeyDown={enterHandler} />
        </div>
    )
}

export default SearchBox