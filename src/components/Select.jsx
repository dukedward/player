import React from 'react'

const Select = ({ menuShow, setMenuShow, selected }) => {
    const menuToggle = () => setMenuShow(!menuShow)
  return (
    <div className={`${menuShow ? 'select select-clicked' : 'select'}`} onClick={menuToggle}>
      <span className='selected'>{selected}</span>
      <div className={`${menuShow ? 'caret caret-rotate' : 'caret'}`}></div>
    </div>
  )
}

export default Select
