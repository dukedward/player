import React, { useEffect, useRef, useState } from 'react'
import Controls from './Controls'
import Dropdown from './Dropdown'
import Video from './Video'
import { vidData } from '../data/dummy'
// import { useHover } from '../hooks/Hooks'

const Player = () => {
    const [videoData, setVideoData] = useState(vidData)
    const [currentVideo, setCurrentVideo] = useState(videoData[0].link)
    const [selectedVideo, setSelectedVideo] = useState(videoData[0].title)
    const vidRef = useRef(null)
    // const [hoverRef, isHovered] = useHover(null)
    useEffect(() => {
    //     fetch('http://localhost:8080/post')
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data)
    //             setVideoData(data)
    //             setCurrentVideo(data[0].link)
    //             setSelectedVideo(data[0].title)
    //         })
        setVideoData(vidData)
        setCurrentVideo(vidData[0].link)
        setSelectedVideo(vidData[0].title)
    }, [])
    useEffect(() => {
        let vidObj = videoData.find(({ title }) => title === selectedVideo)
        setCurrentVideo(vidObj.link)
        vidRef.current.load()
    }, [selectedVideo, currentVideo, videoData])
    const vidOptions = videoData.map((vid) => vid.title)
    const loadVideo = () => {
        let vidObj = videoData.find(({ title }) => title === selectedVideo)
        setCurrentVideo(vidObj.link)
        vidRef.current.load()
    }
    const downloadFile = () => {
        let vidObj = videoData.find(({ title }) => title === selectedVideo)
        const url = vidObj.link
        const fileName = url.slice(url.lastIndexOf('/'),url.length)
        fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
        .then( res => res.blob() )
        .then( res => {
            const href = URL.createObjectURL(res);
            <a download={fileName} href={href} target='_blank'></a>
        } )
    }
    return (
        <div className='player'>
            <Video vidRef={vidRef} currentVideo={currentVideo} />
            <h1 className='video-title'>{selectedVideo}</h1>
            {videoData && (
                <Dropdown
                    options={vidOptions}
                    selected={selectedVideo}
                    setSelected={setSelectedVideo}
                    setCurrentVideo={setCurrentVideo}
                    loadVideo={loadVideo}
                />
            )}
            <Controls vidRef={vidRef} downloadFile={downloadFile} />
            {/* <Controls className={isHovered ? 'show' : ''} vidRef={vidRef} /> */}
        </div>
    )
}

export default Player
