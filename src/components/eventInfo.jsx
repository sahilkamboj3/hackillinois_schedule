import React from "react";
import "../static/EventInfo.css";
import {
  faTasks,
  faBreadSlice,
  faPersonBooth,
  faMicrophoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThinkPeaks } from "@fortawesome/free-brands-svg-icons";

const EventInfo = ({ event }) => {
  const retrieveDayDateYearMonth = (unix) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

    const convertedDate = new Date(unix * 1000);
    const year = convertedDate.getFullYear();
    const date = convertedDate.getDate();

    // converting month
    const month = months[convertedDate.getMonth()];

    // converting day
    const day = days[convertedDate.getDay()];

    return `${day} ${month} ${date}, ${year}`;
  };

  const retrieveDayTime = (unix) => {
    const convertedDate = new Date(unix * 1000);

    // converting minutes
    const minutes =
      convertedDate.getMinutes() == 0 ? "00" : convertedDate.getMinutes();

    const militaryHours = convertedDate.getHours();
    let hour;

    // getting AM or PM
    const am_pm = militaryHours < 12 ? "AM" : "PM";

    // converting hours
    if (militaryHours >= 0 && militaryHours <= 12) {
      hour = militaryHours;
    } else if (militaryHours > 12) {
      hour = militaryHours - 12;
    } else {
      hour = 0;
    }

    return `${hour}:${minutes} ${am_pm}`;
  };

  // getting the start index of the link in the description
  const getHTTPIdx = (description) => {
    return description.indexOf("http");
  };

  return (
    <div key={event.id} className="event">
      {/* if start and end time are the same, display both, else just one */}
      <h1 className="event-title">{event.name}</h1>
      {event.startTime != event.endTime ? (
        <h3 className="time">
          {retrieveDayDateYearMonth(event.startTime)}
          {" - "}
          {retrieveDayTime(event.startTime)}
          {" : "}
          {retrieveDayTime(event.endTime)}
        </h3>
      ) : (
        <h3 className="time">
          {retrieveDayDateYearMonth(event.startTime)}
          {" - "}
          {retrieveDayTime(event.startTime)}
        </h3>
      )}
      {/* a icon for each event type */}
      {event.eventType == "WORKSHOP" ? (
        <div>
          <FontAwesomeIcon icon={faTasks} className="icon" /> {event.eventType}
        </div>
      ) : event.eventType == "MEAL" ? (
        <div>
          <FontAwesomeIcon icon={faBreadSlice} className="icon" />{" "}
          {event.eventType}
        </div>
      ) : event.eventType == "OTHER" ? (
        <div>
          <FontAwesomeIcon icon={faThinkPeaks} className="icon" />{" "}
          {event.eventType}
        </div>
      ) : event.eventType == "MINIEVENT" ? (
        <div>
          <FontAwesomeIcon icon={faPersonBooth} className="icon" />{" "}
          {event.eventType}
        </div>
      ) : event.eventType == "SPEAKER" ? (
        <div>
          <FontAwesomeIcon icon={faMicrophoneAlt} className="icon" />{" "}
          {event.eventType}
        </div>
      ) : (
        <p>{event.eventType}</p>
      )}

      {/* separate the event link for the other parts of the description, if possible */}
      {getHTTPIdx(event.description) == -1 ? (
        <h5 className="description">{event.description}</h5>
      ) : (
        <h5 className="description">
          {event.description.substring(0, getHTTPIdx(event.description))}
          <p></p>
          <a
            href={event.description.substring(getHTTPIdx(event.description))}
            target="_blank"
          >
            {event.description.substring(getHTTPIdx(event.description))}
          </a>
        </h5>
      )}
      {event.sponsor != "" ? <p>Sponsor: {event.sponsor}</p> : ""}
    </div>
  );
};

export default EventInfo;
