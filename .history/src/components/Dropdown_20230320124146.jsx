import React, { useState } from 'react'
import Select from './Select'

const Dropdown = ({ options, selected, setSelected, loadVideo, vidRef, isPlaying, setIsPlaying }) => {
    const [menuShow, setMenuShow] = useState(false)
    let vidObj = videoData.find(({ title }) => title === selectedVideo);
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
    const dropdownList = options.map((option, i) => (
        <li key={i} onClick={selectOption}>
            {option}
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
