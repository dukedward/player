import React, { useEffect, useRef, useState } from "react";
import Controls from "./Controls";
import Dropdown from "./Dropdown";
import Video from "./Video";
import { vidData } from "../data/dummy";
import axios from "axios";
import fileDownload from "js-file-download";
// import { useHover } from '../hooks/Hooks'

const Player = () => {
  const [videoData, setVideoData] = useState(vidData);
  const [currentVideo, setCurrentVideo] = useState(videoData[0].link);
  const [selectedVideo, setSelectedVideo] = useState(videoData[0].title);
  const [isPlaying, setIsPlaying] = useState(false);
  const vidRef = useRef(null);
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
    setVideoData(vidData);
    setCurrentVideo(vidData[0].link);
    setSelectedVideo(vidData[0].title);
  }, []);
  useEffect(() => {
    let vidObj = videoData.find(({ title }) => title === selectedVideo);
    setCurrentVideo(vidObj.link);
    vidRef.current.load();
  }, [selectedVideo, currentVideo, videoData]);
  const vidOptions = videoData.map((vid) => {
    const options = {};
    options.id = vid.tweet_id;
    options.title = vid.title;
    return options
  });
  console.log(vidOptions);
  const loadVideo = () => {
    let vidObj = videoData.find(({ title }) => title === selectedVideo);
    setCurrentVideo(vidObj.link);
    vidRef.current.load();
  };
  const downloadFile = () => {
    let vidObj = videoData.find(({ title }) => title === selectedVideo);
    // console.log(vidObj)
    const url = vidObj.link;
    const fileName = url.slice(url.lastIndexOf("/") + 1, url.length);
    // console.log(fileName)
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => fileDownload(res.data, fileName));
  };
  return (
    <div className="player">
      <Video vidRef={vidRef} currentVideo={currentVideo} />
      <h1 className="video-title">{vidData[0].screen_name}</h1>
      {videoData && (
        <Dropdown
          options={vidOptions}
          selected={selectedVideo}
          setSelected={setSelectedVideo}
          setCurrentVideo={setCurrentVideo}
          loadVideo={loadVideo}
          vidRef={vidRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      )}
      <Controls
        vidRef={vidRef}
        downloadFile={downloadFile}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      {/* <Controls className={isHovered ? 'show' : ''} vidRef={vidRef} /> */}
    </div>
  );
};

export default Player;
