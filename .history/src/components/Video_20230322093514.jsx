import React, { useState, useEffect } from 'react'

const Video = ({ vidRef, hoverRef, currentVideo }) => {
    const [isPlaying, setIsPlayin] = useState(false)
    const [curHeight, setCurHeight] = useState(null)
    const [curWidth, setCurWidth] = useState(null)
    const [vidAspect, setVidAspect] = useState('1922 / 1922')
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
            setCurHeight(vidRef.current.videoHeight)
            setCurWidth(vidRef.current.videoWidth)
            setVidAspect(`${curWidth} / ${curHeight}`)
        })
    }, [currentVideo, vidRef])

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
