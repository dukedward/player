import React, { useState } from 'react'

const Video = ({ vidRef, hoverRef, currentVideo }) => {
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
        <div className='video-container' ref={hoverRef}>
            <video
                id='video'
                playsInline
                ref={vidRef}
                src={currentVideo}
                onClick={playVideo}
            />
        </div>
    )
}

export default Video
