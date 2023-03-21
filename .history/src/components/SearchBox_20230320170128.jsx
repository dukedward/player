import React, { useEffect } from 'react'

const SearchBox = ({ username, setUsername }) => {
    const enterHandler = (e) => {
        if (e.key === 'Enter') {
            console.log(e.target.value);
            setUsername(e.target.value)
            e.target.value = ''
        }
    }
    useEffect(() => {
        axios.get(url, {
            responseType: "json",
        })
        .then((res) => console.log(res.data));
    }, [username])

    return (
        <div  >
            <input type="text" id="search" name="search" placeholder='Search Username' onKeyDown={enterHandler} />
            {/* <button onClick={}>Submit</button> */}
        </div>
    )
}

export default SearchBox