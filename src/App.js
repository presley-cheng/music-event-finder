import React, { useState, useEffect } from "react";
import Events from "./Events";
import Songs from "./Songs";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  // Constant var
  const firstQuery = "drake";
  const unavailable_Msg = "Unavailable";
  const unavailable_ImgUrl =
    "https://visualsound.com/2020products/smart-inventory-clearance/unavailable-image/";

  // Ticketmaster API info
  const TM_package = "discovery";
  const TM_version = "v2";
  const TM_resource = "events";
  const TM_KEY = "dGXKBPj0zD1ARGi7QiTmFTBghh6PAw5f";

  const [inputText, setInputText] = useState("");
  const [query, setQuery] = useState(firstQuery);
  const [events, setEvents] = useState([]);
  const [songs, setSongs] = useState([]);

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
      `https://itunes.apple.com/search?term=${processedQuery}&limit=15&media=music`
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

  const updateInput = (e) => {
    setInputText(e.target.value);
  };

  const getSearch = (e) => {
    // prevent page from refreshing
    e.preventDefault();
    setQuery(inputText);
    setInputText("");
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

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={inputText}
          onChange={updateInput}
          placeholder="Enter Artist's Name"
        />
        <button className="btn btn-primary" type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
      <div className="field">
        <div className="events">
          {events && events.length > 0
            ? events.map((event) => (
                <Events
                  name={event.name ? event.name : unavailable_Msg}
                  note={event.pleaseNote ? event.pleaseNote : unavailable_Msg}
                  price={
                    event.priceRanges
                      ? event.priceRanges[0].min
                      : unavailable_Msg
                  }
                  location={
                    event._embedded
                      ? event._embedded.venues[0].address.line1
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
                          : unavailable_Msg
                      }
                      trackUrl={
                        song.trackViewUrl ? song.trackViewUrl : unavailable_Msg
                      }
                      albumUrl={
                        song.collectionViewUrl
                          ? song.collectionViewUrl
                          : unavailable_Msg
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
