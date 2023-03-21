import React, { useEffect, useRef, useState } from "react";
import Controls from "./Controls";
import Dropdown from "./Dropdown";
import Video from "./Video";
import { vidData } from "../data/dummy";
import axios from "axios";
import fileDownload from "js-file-download";
import SearchBox from "./SearchBox";
// import { useHover } from '../hooks/Hooks'

const Player = () => {
  const [videoData, setVideoData] = useState(vidData);
  const [currentVideo, setCurrentVideo] = useState(videoData[0].link);
  const [selectedVideo, setSelectedVideo] = useState(videoData[0].title);
  const [isPlaying, setIsPlaying] = useState(false);
  const [username, setUsername] = useState("vaeredd");
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
  useEffect(() => {
    const url = `https://tweetgrab.herokuapp.com/api/user/timeline?username=${username}`;
    axios
      .get(url, {
        responseType: "json",
      })
      .then((res) => {
        let data
        let vids = []
        data = res.data 
        data = data.filter(tweet => tweet.hasOwnProperty('extended_entities'))
        data = data.map(tweet => tweet.extended_entities)
        data = data.map(tweet => tweet.media)
        data = data.map(dataArr => dataArr.map( tweet => { 
            if (tweet.type === 'video') { 
                vids.push({
                    "size": tweet.sizes.large ,
                    "id": tweet.id_str,
                    "type": tweet.type,
                    "link": tweet.video_info.variants
                })
            }
        }))
        vids.forEach(
            vid => {
                let vidObj = vid.link.find( x => x.url.includes(vid.size.h))
                console.log(vidObj);
                vid.link = vidObj.url
            }
        )
        console.log(vids)
      });
  }, [username]);
  const vidOptions = videoData.map((vid) => vid.title);
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
      <SearchBox username={username} setUsername={setUsername} />
      <Video vidRef={vidRef} currentVideo={currentVideo} />
      <h1 className="video-title">{username}</h1>
      {videoData && (
        <Dropdown
          options={vidOptions}
          selected={selectedVideo}
          setSelected={setSelectedVideo}
          setCurrentVideo={setCurrentVideo}
          loadVideo={loadVideo}
        />
      )}
      <Controls
        options={vidOptions}
        vidRef={vidRef}
        loadVideo={loadVideo}
        downloadFile={downloadFile}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        selected={selectedVideo}
        setSelected={setSelectedVideo}
      />
      {/* <Controls className={isHovered ? 'show' : ''} vidRef={vidRef} /> */}
    </div>
  );
};

export default Player;
