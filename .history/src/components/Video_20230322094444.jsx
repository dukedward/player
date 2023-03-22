import React, { useState, useEffect } from 'react'

const Video = ({ vidRef, hoverRef, currentVideo, vidAspect }) => {
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
    useEffect(() => {
        vidRef.current.addEventListener('loadeddata', () => {
            console.log(vidAspect);
        })
    }, [currentVideo, vidRef, curWidth, curHeight, vidAspect])

    return (
        <div className='video-container' ref={hoverRef} style={{ 'aspectRatio': {vidAspect}}}>
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
