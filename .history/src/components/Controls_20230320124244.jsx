import React from "react";
import { FaBackward, FaForward, FaPlay, FaPause, FaDownload } from "react-icons/fa";

const Controls = ({ vidData, vidRef, downloadFile, isPlaying, setIsPlaying }) => {
    let vidObj = videoData.find(({ title }) => title === selectedVideo);
  const playVideo = () => {
    if (isPlaying === false) {
      vidRef.current.play();
      setIsPlaying(!isPlaying);
    } else {
      vidRef.current.pause();
      setIsPlaying(!isPlaying);
    }
  };

  const handleDL = () => {
    downloadFile()
  }

  return (
    <div className="control-container">
      <div className="controls">
        <button className="btn">
          <FaBackward />
        </button>
        <button className="btn btn-main" onClick={playVideo}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="btn">
          <FaForward />
        </button>
      </div>
      <div className="extra-controls">
        <button className="btn">
            <FaDownload onClick={handleDL} />
        </button>
      </div>
    </div>
  );
};

export default Controls;
