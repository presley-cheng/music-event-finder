import React from "react";
import "./events.css";

const Events = ({ name, note, price, location, date, time, url, images }) => {
  return (
    <div className="event">
      <div className="event-info">
        <h3>{name}</h3>
        <p>{note}</p>
        <p>Lowest Price: ${price}</p>
        <p>Location: {location}</p>
        <p>
          Date/Time: {date} {time} PST
        </p>
        <a href={url} className="btn btn-primary">
          Go to Ticket Master
        </a>
      </div>
      <div className="event-img">
        <img className="image" src={images} alt="" />
      </div>
    </div>
  );
};

export default Events;
