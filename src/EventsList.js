import React from "react";
import Events from "./Events";

const EventsList = ({filteredEvents, unavailable_Msg, unavailable_ImgUrl}) => {
  const eventNotFound = () => {
    return (
      <div className="noEventMsg">
        <h2>No Events Found</h2>
      </div>
    );
  };

    return (
        <div>
          {filteredEvents && filteredEvents.length > 0
            ? filteredEvents.map((event) => (
                <Events
                  name={event.name ? event.name : unavailable_Msg}
                  minPrice={
                    event.priceRanges
                      ? event.priceRanges[0].min
                      : null
                  }
                  maxPrice={
                    event.priceRanges
                      ? event.priceRanges[0].max
                      : null
                  }
                  currency={
                    event.priceRanges
                      ? event.priceRanges[0].currency
                      : null
                  }
                  address={
                    event._embedded && event._embedded.venues[0].address
                      ? event._embedded.venues[0].address.line1
                      : unavailable_Msg
                  }
                  city={
                    event._embedded && event._embedded.venues[0].city
                      ? event._embedded.venues[0].city.name
                      : unavailable_Msg
                  }
                  country={
                    event._embedded && event._embedded.venues[0].country
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
    );
};

export default EventsList;