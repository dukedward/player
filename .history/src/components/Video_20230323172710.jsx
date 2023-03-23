import React from 'react'

const Video = ({ vidRef, hoverRef, currentVideo, vidAspect, playVideo, nextVideo }) => {
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
