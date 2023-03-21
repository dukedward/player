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
  const vidRef = useRef(null);
  const loadVideo = () => {
    let vidObj = videoData.find(({ id }) => id === selectedVideo);
    setCurrentVideo(vidObj.link);
    vidRef.current.load();
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
    let vidObj = videoData.find(({ id }) => id === selectedVideo);
    setCurrentVideo(vidObj.link);
    vidRef.current.load();
  }, [selectedVideo, currentVideo, videoData]);
  const vidOptions = videoData.map((vid) => vid.id);
  return (
    <div className="player">
      <SearchBox username={username} setUsername={setUsername} />
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
      <Video vidRef={vidRef} currentVideo={currentVideo} />
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
