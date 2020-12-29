import React, { useState, useEffect } from "react";
import Events from "./Events";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";

function App() {
  // Ticketmaster API info
  const TM_package = "discovery";
  const TM_version = "v2";
  const TM_resource = "events";
  const TM_KEY = "dGXKBPj0zD1ARGi7QiTmFTBghh6PAw5f";

  const [inputText, setInputText] = useState("");
  const [query, setQuery] = useState("concerts");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // replace space with dash in strings if any
    let processedQuery = "";
    for (let i = 0; i < query.length; i++) {
      if (query.charAt(i) === " ") processedQuery += "-";
      else processedQuery += query.charAt(i);
    }

    // fetching ticket master info
    getEvents(processedQuery);
  }, [query]);

  const getEvents = async (searchQuery) => {
    const TM_response = await fetch(
      `https://app.ticketmaster.com/${TM_package}/${TM_version}/${TM_resource}.json?keyword=${searchQuery}&apikey=${TM_KEY}`
    );
    const TM_data = await TM_response.json();

    // prevent not finding events
    try {
      setEvents(TM_data._embedded.events);
    } catch (error) {
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

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={inputText}
          onChange={updateInput}
          placeholder="Enter Name, Location, Date..."
        />
        <button className="btn btn-primary" type="submit">
          <i class="fas fa-search"></i>
        </button>
      </form>
      <div className="events">
        {events && events.length > 0
          ? events.map((event) => (
              <Events
                name={event.name ? event.name : "Not Available"}
                note={event.pleaseNote ? event.pleaseNote : "Not Available"}
                price={event.priceRanges ? event.priceRanges[0].min : "Not Available"}
                location={event._embedded ? event._embedded.venues[0].address.line1 : "Not Available"}
                date={event.dates.start.localDate ? event.dates.start.localDate : "Not Available"}
                time={event.dates.start.localTime ? event.dates.start.localTime : "Not Available"}
                url={event.url ? event.url : "Not Available"}
                images={event.images[0].url}
              />
            ))
          : eventNotFound()}
      </div>
    </div>
  );
}

export default App;
