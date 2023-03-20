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
    loadVideo()
    switchVideo()
  }

  const nextVideo = () => {
    loadVideo()
    switchVideo()
}

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
