import React from "react";
import "./Songs.css";

const Songs = ({
  name,
  trackName,
  albumName,
  artistUrl,
  trackUrl,
  albumUrl,
}) => {
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
    </tr>
  );
};

export default Songs;
