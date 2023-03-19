import React from 'react'

const Slider = () => {
  return (
    <div className='range-slider'>
      <input className='slider' type='range' min='0' max='0' value='0' />
      <div className='slider-thumb' />
      <div className='progress' />
    </div>
  )
}

export default Slider
