import React, { useState } from 'react'

const Video = ({ vidRef, hoverRef, currentVideo, vidAspect, nextVideo }) => {
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
        <div className='video-container' ref={hoverRef} style={{ 'aspectRatio': {vidAspect}}}>
            <video
                id='video'
                playsInline
                ref={vidRef}
                src={currentVideo}
                onClick={playVideo}
                onEnded={nextVideo}
            />
        </div>
    )
}

export default Video
