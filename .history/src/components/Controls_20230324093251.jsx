import React from "react";
import {
  FaBackward,
  FaForward,
  FaPlay,
  FaPause,
  FaDownload,
  FaExpand,
  FaVolumeMute,
  FaVolumeUp
} from "react-icons/fa";

const Controls = ({
  downloadFile,
  isPlaying,
  isMuted,
  playVideo,
  prevVideo,
  nextVideo,
  showFullscreen
}) => {
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
          <FaDownload onClick={downloadFile} />
        </button>
        <button className="btn">
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp/>}
        </button>
        <button className="btn">
          <FaExpand onClick={showFullscreen} />
        </button>
      </div>
    </div>
  );
};

export default Controls;
