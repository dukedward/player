import React from 'react'

const SearchBox = ({ setUsername }) => {
    const enterHandler = (e) => {
        if (e.key === 'Enter') {
            console.log(e.target.value);
            setUsername(e.target.value)
            e.target.value = ''
        } else {
            e.preventDefault()
        }
    }

    return (
        <div  >
            <input type="text" id="search" name="search" placeholder='Search Username' onKeyDown={enterHandler} />
            {/* <button onClick={}>Submit</button> */}
        </div>
    )
}

export default SearchBox