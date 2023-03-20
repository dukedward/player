import React, { useState } from 'react'
import Select from './Select'

const Dropdown = ({ options, selected, setSelected, loadVideo, vidRef, isPlaying, setIsPlaying }) => {
    const [menuShow, setMenuShow] = useState(false)
    const selectOption = (e) => {
        setSelected(e.target.innerText)
        setMenuShow(!menuShow)
        loadVideo()
        if (isPlaying === true) {
          vidRef.current.play();
          setIsPlaying(!isPlaying);
        } else {
          vidRef.current.pause();
          setIsPlaying(!isPlaying);
        }
    }
    const dropdownList = options.map(option => (
        <li key={option.tweet_id} onClick={selectOption}>
            {option.title}
        </li>
    ))
    return (
        <div className='dropdown'>
            <Select
                menuShow={menuShow}
                setMenuShow={setMenuShow}
                selected={selected}
            />
            <ul className={`${menuShow ? 'menu menu-open' : 'menu'}`}>
                {dropdownList}
            </ul>
        </div>
    )
}

export default Dropdown
