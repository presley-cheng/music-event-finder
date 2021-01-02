import React, { useState, useEffect } from "react";
import Events from "./Events";
import Songs from "./Songs";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  // Constant var
  const firstQuery = "drake";
  const unavailable_Msg = "Unavailable";
  const unavailable_Url = "#";
  const unavailable_ImgUrl =
    "https://visualsound.com/2020products/smart-inventory-clearance/unavailable-image/";
  const DATE_all = "date_all";
  const DATE_seven = "date_seven";
  const DATE_thirty = "date_thirty";
  const DATE_sixty = "date_sixty";

  // Ticketmaster API info
  const TM_package = "discovery";
  const TM_version = "v2";
  const TM_resource = "events";
  const TM_KEY = "dGXKBPj0zD1ARGi7QiTmFTBghh6PAw5f";

  const [inputText, setInputText] = useState("");
  const [query, setQuery] = useState(firstQuery);
  const [events, setEvents] = useState([]);
  const [songs, setSongs] = useState([]);
  const [status, setStatus] = useState(DATE_all);
  const [filterEvents, setFilterEvents] = useState([]);

  // SEARCHING STUFF
  const updateInput = (e) => {
    setInputText(e.target.value);
  };

  const getSearch = (e) => {
    // prevent page from refreshing
    e.preventDefault();
    setQuery(inputText);
    setInputText("");
  };

  // API STUFF
  useEffect(() => {
    // fetching ticket master info
    getEvents(query);

    // fetching spotify info
    getSongs(query);
  }, [query]);

  // request songs
  const getSongs = async (searchQuery) => {
    // replace space with "+"
    const processedQuery = searchQuery.replace(" ", "+");
    const song_response = await fetch(
      `https://itunes.apple.com/search?term=${processedQuery}&limit=10&media=music`
    );

    const song_data = await song_response.json();
    try {
      setSongs(song_data.results);
    } catch (err) {
      setSongs([]);
    }
  };

  // request events
  const getEvents = async (searchQuery) => {
    // replace space with dash
    const processedQuery = searchQuery.replace(" ", "-");
    const TM_response = await fetch(
      `https://app.ticketmaster.com/${TM_package}/${TM_version}/${TM_resource}.json?keyword=${processedQuery}&apikey=${TM_KEY}`
    );

    const TM_data = await TM_response.json();
    // prevent not finding events
    try {
      setEvents(TM_data._embedded.events);
    } catch (err) {
      setEvents([]);
    }
  };

  const eventNotFound = () => {
    return (
      <div className="noEventMsg">
        <h2>No Events Found</h2>
      </div>
    );
  };

  const songNotFound = () => {
    return (
      <div className="noSongMsg">
        <h2>No Songs Found</h2>
      </div>
    );
  };

  // DROPDOWN MENU STUFF
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  // filter events handler
  useEffect(() => {
    filterEventsHandler();
  }, [status]);

  const filterEventsHandler = () => {
    switch (status) {
      case DATE_seven:
        setFilterEvents(events.filter((event) => withinDateRange(event, 7)));
        break;
      case DATE_thirty:
        setFilterEvents(events.filter((event) => withinDateRange(event, 30)));
        break;
      case DATE_sixty:
        setFilterEvents(events.filter((event) => withinDateRange(event, 60)));
        break;
      default:
        setFilterEvents(events);
        break;
    }
  };

  const withinDateRange = (event, range) => {
    let date = new Date();
    date.setDate(date.getDate() + range);
    const eventDate = new Date(event.dates.start.dateTime);
    return eventDate.getTime() <= date.getTime();
  };

  // for testing
  useEffect(() => {
    filterEvents.forEach((event) => {
      console.log(event);
    });
  }, [filterEvents]);

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={inputText}
          onChange={updateInput}
          placeholder="Enter a keyword (e.g. Artist's Name)"
        />
        <button className="btn btn-primary" type="submit">
          <i className="fas fa-search"></i>
        </button>
        <div className="filter-date">
          <select className="btn btn-secondary" onChange={statusHandler}>
            <option value={DATE_all}>All</option>
            <option value={DATE_seven}>In 7 days</option>
            <option value={DATE_thirty}>In 30 days</option>
            <option value={DATE_sixty}>In 60 days</option>
          </select>
        </div>
      </form>
      <div className="field">
        <div className="events">
          {events && events.length > 0
            ? events.map((event) => (
                <Events
                  name={event.name ? event.name : unavailable_Msg}
                  note={event.pleaseNote ? event.pleaseNote : unavailable_Msg}
                  minPrice={
                    event.priceRanges
                      ? event.priceRanges[0].min
                      : unavailable_Msg
                  }
                  maxPrice={
                    event.priceRanges
                      ? event.priceRanges[0].max
                      : unavailable_Msg
                  }
                  currency={
                    event.priceRanges
                      ? event.priceRanges[0].currency
                      : unavailable_Msg
                  }
                  address={
                    event._embedded
                      ? event._embedded.venues[0].address.line1
                      : unavailable_Msg
                  }
                  city={
                    event._embedded
                      ? event._embedded.venues[0].city.name
                      : unavailable_Msg
                  }
                  country={
                    event._embedded
                      ? event._embedded.venues[0].country.countryCode
                      : unavailable_Msg
                  }
                  date={
                    event.dates.start.localDate
                      ? event.dates.start.localDate
                      : unavailable_Msg
                  }
                  time={
                    event.dates.start.localTime
                      ? event.dates.start.localTime
                      : unavailable_Msg
                  }
                  url={event.url ? event.url : unavailable_Msg}
                  images={
                    event.images ? event.images[0].url : unavailable_ImgUrl
                  }
                />
              ))
            : eventNotFound()}
        </div>
        <div className="container">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <td>TITLE</td>
                <td>ARTIST</td>
                <td>ALBUM</td>
                <td>PREVIEW</td>
              </tr>
            </thead>
            <tbody>
              {songs && songs.length > 0
                ? songs.map((song) => (
                    <Songs
                      name={song.artistName ? song.artistName : unavailable_Msg}
                      trackName={
                        song.trackName ? song.trackName : unavailable_Msg
                      }
                      albumName={
                        song.collectionName
                          ? song.collectionName
                          : unavailable_Msg
                      }
                      artistUrl={
                        song.artistViewUrl
                          ? song.artistViewUrl
                          : unavailable_Url
                      }
                      trackUrl={
                        song.trackViewUrl ? song.trackViewUrl : unavailable_Url
                      }
                      albumUrl={
                        song.collectionViewUrl
                          ? song.collectionViewUrl
                          : unavailable_Url
                      }
                      previewUrl={
                        song.previewUrl ? song.previewUrl : unavailable_Url
                      }
                    />
                  ))
                : songNotFound()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
