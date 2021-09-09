import React from "react";
import "./events.css";

const Events = ({ name, note, minPrice, maxPrice, currency, address, city, country, date, time, url, images }) => {
  
  const priceInfo = () => {
    let result = "";
    if (minPrice) result += "$" + minPrice + " - ";
    if (maxPrice) result += "$" + maxPrice + " ";
    result += (result.length === 0 ? "Unavailable" : currency);

    return result;
  };

  const urlInfo = () => {
    if (url === "#") return "Unavailable";
    return "Go to Ticket Master";
  };


  return (
    <div className="event">
      <div className="event-info">
        <h3>{name}</h3>
        <p><u><b>Price</b></u>: {priceInfo()}</p>
        <p><u><b>Location</b></u>: {address}, {city}, {country}</p>
        <p>
          <u><b>Date/Time</b></u>: {date} {time} PST
        </p>
        <a href={url} className="btn btn-primary" id="goToBtn">
          {urlInfo()}
        </a>
      </div>
      <div className="event-img">
        <img className="image" src={images} alt="Advertisement" />
      </div>
    </div>
  );
};

export default Events;
