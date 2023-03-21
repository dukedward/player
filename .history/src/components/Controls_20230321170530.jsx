import React from "react";
import {
  FaBackward,
  FaForward,
  FaPlay,
  FaPause,
  FaDownload,
} from "react-icons/fa";

const Controls = ({
  options,
  selected,
  setSelected,
  vidRef,
  downloadFile,
  isPlaying,
  setIsPlaying,
  loadVideo,
}) => {
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
    let prevVidId = options.indexOf(selected) - 1
    if (prevVidId < 0) {
        prevVidId = options.length - 1
    }
    setSelected(options[prevVidId])
    loadVideo()
  };

  const nextVideo = () => {
    let nextVidId = options.indexOf(selected) + 1
    if (nextVidId > options.length - 1) {
        nextVidId = 0
    }
    setSelected(options[nextVidId])
    loadVideo()
  };

  const handleDL = () => {
    downloadFile();
  };

  return (
    <div className="control-container">
      <div className="controls">
        <button className="btn">
          <FaBackward onClick={prevVideo} />
        </button>
        <button className="btn btn-main" onClick={playVideo}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="btn">
          <FaForward onClick={nextVideo} />
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
