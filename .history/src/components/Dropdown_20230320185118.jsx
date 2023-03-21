import React, { useState } from 'react'
import Select from './Select'

const Dropdown = ({ options, selected, setSelected, loadVideo }) => {
    const [menuShow, setMenuShow] = useState(false)
    const selectOption = (e) => {
        setSelected(e.target.data-val)
        setMenuShow(!menuShow)
        loadVideo()
    }
    const dropdownList = options.map((option, i) => (
        <li key={i} onClick={selectOption} data-val={i} >
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
