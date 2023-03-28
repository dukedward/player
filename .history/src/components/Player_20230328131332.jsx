import React, { useEffect, useRef, useState } from "react";
import Controls from "./Controls";
import Dropdown from "./Dropdown";
import Video from "./Video";
import axios from "axios";
import fileDownload from "js-file-download";
import SearchBox from "./SearchBox";
// import { useHover } from '../hooks/Hooks'

const Player = () => {
  const [videoData, setVideoData] = useState();
  const [currentVideo, setCurrentVideo] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [curHeight, setCurHeight] = useState(null);
  const [curWidth, setCurWidth] = useState(null);
  const [vidAspect, setVidAspect] = useState("1922 / 1922");
  const [vidOptions, setVidOptions] = useState();
  const vidRef = useRef(null);
//   const setTime = (output, input) => {
//     //Calculate min from input
//     const min = Math.floor(input / 60);
//     //Calculate sec from input
//     const sec = Math.floor(input % 60);
//     if (sec < 10) {
//       output.innerHTML = `${min}:0${sec}`;
//     } else {
//       output.innerHTML = `${min}:${sec}`;
//     }
//   };
//   const updateTime = () => {
//     //Get the current video time
//     const currentVideoTime = Math.floor(vidRef.currentTime);
//     //Get the percentage
//     const timePercentage = `${(currentVideoTime / vidRef.duration) * 100}%`;
//     //Output the current video time
//     // setTime(time, currentVideoTime);
//     //Set the slider progress to the percentage
//     // progress.style.width = timePercentage;
//     // thumb.style.left = timePercentage;
//   };
  const loadVideo = () => {
    let vidObj = videoData.reduce((p, c) => {return p.id === selectedVideo ? p : c});
    setCurrentVideo(vidObj.link);
    setTitle(vidObj.text);
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
  const fetchData = async () => {
    const userUrl = `http://localhost:8080/api/user?username=${username}`;
    const url = `http://localhost:8080/api/user/vids?username=${username}`;
    await axios
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
              if (res.status === 200 && res.data.length > 0) {
                let vids;
                vids = res.data;
                console.log();
                setVideoData(vids);
                setTitle(vids[0].text);
                setCurrentVideo(vids[0].link);
                setSelectedVideo(vids[0].id);
                setVidOptions(vids.map((vid) => vid.id));
              }
            })
            .catch((error) => {
              console.log(error);
            //   console.log(error.message);
            });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const muteVideo = () => {
    if (isMuted === true) {
        vidRef.current.muted = false
        setIsMuted(!isMuted)
    } else {
        vidRef.current.muted = true
        setIsMuted(!isMuted)
    }
  }
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
    let vidObj = videoData.reduce((p, c) => {return p.id === selectedVideo ? p : c});
    const url = vidObj.link;
    const fileName = url.slice(url.lastIndexOf("/") + 1, url.lastIndexOf("?"));
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => fileDownload(res.data, fileName));
  };
  const showFullscreen = () => {
    if (vidRef.current.requestFullscreen) {
        vidRef.current.requestFullscreen()
    } else if (vidRef.current.msRequestFullScreen) {
        vidRef.current.msRequestFullScreen()
    } else if (vidRef.current.mozRequestFullScreen) {
        vidRef.current.mozRequestFullScreen()
    } else if (vidRef.current.webkitRequestFullScreen) {
        vidRef.current.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
    } else if (window.matchMedia("(max-width: 700px)").matches) {
        vidRef.current.toggleAttribute('controls')
    }
  }
  useEffect(() => {
    if (username){
        fetchData();
    }
  }, [username]);
  useEffect(() => {
    if (videoData && currentVideo && selectedVideo) {
        loadVideo()
    }
  },[videoData, currentVideo, selectedVideo])
  return (
    <div className="player">
      {username && <h1 className="video-user">{username}</h1>}
      {title && <h2 className="video-title">{title}</h2>}
      <SearchBox setUsername={setUsername} />
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
            playVideo={playVideo}
            nextVideo={nextVideo}
            vidRef={vidRef}
            currentVideo={currentVideo}
            vidAspect={vidAspect}
            isPlaying={isPlaying}
          />
          {/* <Timeline className={isHovered ? 'show' : ''} vidRef={vidRef} /> */}
          <Controls
            muteVideo={muteVideo}
            playVideo={playVideo}
            prevVideo={prevVideo}
            nextVideo={nextVideo}
            showFullscreen={showFullscreen}
            downloadFile={downloadFile}
            isPlaying={isPlaying}
            isMuted={isMuted}
          />
        </>
      )}
    </div>
  );
};

export default Player;
