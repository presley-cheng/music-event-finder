import React from "react";
import style from "./events.module.css";

const Events = ({ name, note, price, location, date, time, url, images}) => {
    return (
        <div className={style.event}>
            <h3>{name}</h3>
            <p>{note}</p>
            <p>${price}</p>
            <p>{location}</p>
            <p>{date} {time}</p>
            <a href={url} className="btn btn-primary">Go to Ticket Master</a>
            <br/>
            <img className={style.image} src={images} alt=""/>
        </div>
    );
};

export default Events;