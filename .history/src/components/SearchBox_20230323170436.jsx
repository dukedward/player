import React from 'react'

const SearchBox = ({ setUsername, getVids }) => {
    const enterHandler = (e) => {
        if (e.key === 'Enter') {
            setUsername(e.target.value)
            e.target.value = ''
            getVids()
        } 
    }
    const handleSubmit = () => {
        getVids()
    }

    return (
        <div  >
            <input type="text" id="search" name="search" placeholder='Search Username' onKeyDown={enterHandler} onSubmit={getVids}/>
        </div>
    )
}

export default SearchBox