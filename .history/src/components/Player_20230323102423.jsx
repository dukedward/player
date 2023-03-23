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
  const [videoData, setVideoData] = useState();
  const [currentVideo, setCurrentVideo] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [username, setUsername] = useState("");
  const [curHeight, setCurHeight] = useState(null);
  const [curWidth, setCurWidth] = useState(null);
  const [vidAspect, setVidAspect] = useState("1922 / 1922");
  const [vidOptions, setVidOptions] = useState()
  const vidRef = useRef(null);
  const setTime = (output, input) => {
    //Calculate min from input
    const min = Math.floor(input / 60);
    //Calculate sec from input
    const sec = Math.floor(input % 60);
    if (sec < 10) {
      output.innerHTML = `${min}:0${sec}`;
    } else {
      output.innerHTML = `${min}:${sec}`;
    }
  };
  const updateTime = () => {
    //Get the current video time
    const currentVideoTime = Math.floor(vidRef.currentTime);
    //Get the percentage
    const timePercentage = `${(currentVideoTime / vidRef.duration) * 100}%`;
    //Output the current video time
    // setTime(time, currentVideoTime);
    //Set the slider progress to the percentage
    // progress.style.width = timePercentage;
    // thumb.style.left = timePercentage;
  };
  const loadVideo = () => {
    let vidObj = videoData.find(({ id }) => id === selectedVideo);
    setCurrentVideo(vidObj.link);
    vidRef.current.load();
    vidRef.current.addEventListener("loadeddata", () => {
      if (isPlaying === true) {
        vidRef.current.play();
        setIsPlaying(true);
      } else {
        vidRef.current.pause();
        setIsPlaying(false);
      }
      setCurHeight(vidRef.current.videoHeight);
      setCurWidth(vidRef.current.videoWidth);
      setVidAspect(`${curWidth} / ${curHeight}`);
    });
  };
  const playVideo = () => {
    if (isPlaying === false) {
      vidRef.current.play();
      setIsPlaying(!isPlaying);
    } else {
      vidRef.current.pause();
      setIsPlaying(!isPlaying);
    }
  };
  const prevVideo = () => {
    let prevVidId = vidOptions.indexOf(selectedVideo) - 1;
    if (prevVidId < 0) {
      prevVidId = vidOptions.length - 1;
    }
    setSelectedVideo(vidOptions[prevVidId]);
    loadVideo();
  };
  const nextVideo = () => {
    let nextVidId = vidOptions.indexOf(selectedVideo) + 1;
    if (nextVidId > vidOptions.length - 1) {
      nextVidId = 0;
    }
    setSelectedVideo(vidOptions[nextVidId]);
    loadVideo();
  };
  const downloadFile = () => {
    let vidObj = videoData.find(({ id }) => id === selectedVideo);
    const url = vidObj.link;
    const fileName = url.slice(url.lastIndexOf("/") + 1, url.lastIndexOf("?"));
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => fileDownload(res.data, fileName));
  };
  useEffect(() => {
    const userUrl = `https://tweetgrab.herokuapp.com/api/user?username=${username}`;
    const url = `https://tweetgrab.herokuapp.com/api/user/vids?username=${username}`;
    axios
      .get(userUrl, {
        responseType: "json",
      })
      .then((res) => {
        if (res.status === 200) {
          axios
            .get(url, {
              responseType: "json",
            })
            .then((res) => {
              let vids;
              vids = res.data;
              setVideoData(vids);
              setCurrentVideo(vids[0].link);
              setSelectedVideo(vids[0].id);
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
      setVidOptions(videoData.map((vid) => vid.id))
  }, [username, selectedVideo, currentVideo, videoData]);
  useEffect(() => {
    loadVideo();
  });
  return (
    <div className="player">
      <h1 className="video-title">{username}</h1>
      <SearchBox username={username} setUsername={setUsername} />
      {videoData && (
        <>
          <Dropdown
            options={vidOptions}
            selected={selectedVideo}
            setSelected={setSelectedVideo}
            setCurrentVideo={setCurrentVideo}
            loadVideo={loadVideo}
          />
          <Video
            nextVideo={nextVideo}
            vidRef={vidRef}
            currentVideo={currentVideo}
            vidAspect={vidAspect}
          />
          {/* <Timeline className={isHovered ? 'show' : ''} vidRef={vidRef} /> */}
          <Controls
            loadVideo={loadVideo}
            playVideo={playVideo}
            prevVideo={prevVideo}
            nextVideo={nextVideo}
            downloadFile={downloadFile}
            isPlaying={isPlaying}
          />
        </>
      )}
    </div>
  );
};

export default Player;
