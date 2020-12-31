import React from "react";
import "./Songs.css";

const Songs = ({
  name,
  trackName,
  albumName,
  artistUrl,
  trackUrl,
  albumUrl,
  previewUrl,
}) => {
  // update audio on page refresh
  const refreshAudio = () => {
    let audioElement = document.getElementById("audioElem");
    audioElement.src = previewUrl;
    audioElement.load();
  };

  return (
    <tr>
      <td>
        <a href={trackUrl}>{trackName}</a>
      </td>
      <td>
        <a href={artistUrl}>{name}</a>
      </td>
      <td>
        <a href={albumUrl}>{albumName}</a>
      </td>
      <td>
        <audio
          id="audioElem"
          onChange={refreshAudio}
          src={previewUrl}
          controls
        ></audio>
      </td>
    </tr>
  );
};

export default Songs;
