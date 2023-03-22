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
  const [selectedVideo, setSelectedVideo] = useState(videoData[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [username, setUsername] = useState("dabofkya");
  const [curHeight, setCurHeight] = useState(null);
  const [curWidth, setCurWidth] = useState(null);
  const [vidAspect, setVidAspect] = useState("1922 / 1922");
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
  useEffect(() => {
    const userUrl = `https://tweetgrab.herokuapp.com/api/user?username=${username}`;
    const url = `https://tweetgrab.herokuapp.com/api/user/timeline?username=${username}`;
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
              let data;
              let vids = [];
              data = res.data;
              data = data.filter((tweet) =>
                tweet.hasOwnProperty("extended_entities")
              );
              data = data.map((tweet) => tweet.extended_entities);
              data = data.map((tweet) => tweet.media);
              data.map((dataArr) =>
                dataArr.map((tweet) => {
                  if (tweet.type === "video") {
                    vids.push({
                      size: tweet.sizes.large,
                      id: tweet.id_str,
                      type: tweet.type,
                      link: tweet.video_info.variants,
                    });
                  }
                  return tweet;
                })
              );
              vids.forEach((vid) => {
                let vidObj = vid.link.find((x) => x.url.includes(vid.size.h));
                if (vidObj) {
                  vid.link = vidObj.url;
                } else {
                  vidObj = vid.link.find((x) => x.bitrate === 2176000);
                  vid.link = vidObj.url;
                }
              });
              vids = vids.map(JSON.stringify);
              vids = new Set(vids);
              vids = Array.from(vids).map(JSON.parse);
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
  }, [username]);
  useEffect(() => {
    loadVideo();
  }, );
  const vidOptions = videoData.map((vid) => vid.id);
  return (
    <div className="player">
      <h1 className="video-title">{username}</h1>
      <SearchBox username={username} setUsername={setUsername} />
      {videoData && (
        <Dropdown
          options={vidOptions}
          selected={selectedVideo}
          setSelected={setSelectedVideo}
          setCurrentVideo={setCurrentVideo}
          loadVideo={loadVideo}
        />
      )}
      <Video
        nextVideo={nextVideo}
        vidRef={vidRef}
        currentVideo={currentVideo}
        vidAspect={vidAspect}
      />
      <Controls
        loadVideo={loadVideo}
        playVideo={playVideo}
        prevVideo={prevVideo}
        nextVideo={nextVideo}
        downloadFile={downloadFile}
        isPlaying={isPlaying}
      />
      {/* <Controls className={isHovered ? 'show' : ''} vidRef={vidRef} /> */}
    </div>
  );
};

export default Player;
