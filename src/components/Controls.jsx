import React, { useState } from 'react'
import { FaBackward, FaForward, FaPlay, FaPause } from 'react-icons/fa'

const Controls = ({ vidRef }) => {
    const [isPlaying, setIsPlayin] = useState(false)

    const playVideo = () => {
        if (isPlaying === false) {
            vidRef.current.play()
            setIsPlayin(!isPlaying)
        } else {
            vidRef.current.pause()
            setIsPlayin(!isPlaying)
        }
    }

    return (
        <div className='controls'>
            <button className='btn'>
                <FaBackward />
            </button>
            <button className='btn btn-main' onClick={playVideo}>
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button className='btn'>
                <FaForward />
            </button>
        </div>
    )
}

export default Controls
