import React, { useState, useEffect } from "react";
import {
  faDiscord,
  faFacebook,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHSquare } from "@fortawesome/free-solid-svg-icons";
import EventInfo from "./components/eventInfo";
import Calendar from "react-calendar";
import Nav from "./components/Nav";
import "./static/ReactCalendar.css";
import "./static/App.css";
import "react-calendar/dist/Calendar.css";

const App = () => {
  // all the events
  const [events, setEvents] = useState([]);
  // the date the user has currently selected - date is 07-06-2020
  const [date, setDate] = useState(
    new Date(Date.UTC("2020", "07", "06", "23", "31", "30"))
  );
  // the events on the current date
  const [curEvents, setCurEvents] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);

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
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    // GET the events
    fetch("https://api.hackillinois.org/event/")
      .then((res) => res.json())
      .then((data) => {
        // store the events in the events variable
        setEvents(data["events"]);

        // initially store the events to the initial date value
        setCurEvents(changeCurEvents(date));
      });
  }, []);

  // returns the date of the unix time
  const returnDate = (unix) => {
    const javaScriptDate = new Date(unix * 1000);
    return javaScriptDate.getDate();
  };

  // changes the current events list when the user selects a different date by filtering the events by date and ordering them
  const changeCurEvents = (date) => {
    const newCurEvents = events.filter((event) => {
      if (returnDate(event.startTime) == date.getDate()) {
        return 1;
      } else {
        return 0;
      }
    });

    const orderedCurEvents = newCurEvents.sort((event1, event2) => {
      if (
        new Date(event1.startTime).getTime() / 1000 <=
        new Date(event2.startTime).getTime() / 1000
      ) {
        return -1;
      } else {
        return 1;
      }
    });

    return orderedCurEvents;
  };

  // called the changeCurEvents() method every time the date changes
  useEffect(() => {
    const newEvents = changeCurEvents(date);
    setCurEvents(newEvents);
  }, [date]);

  // changes the date itself when the user selects a new date
  const onDateChange = (date) => {
    setInitialLoad(false);
    setDate(date);
  };

  return (
    <div className="wrapper">
      {/* navbar*/}
      <div className="nav">
        <Nav />
      </div>

      {/* calendar */}
      <div className="calendar">
        <Calendar
          value={date}
          onChange={onDateChange}
          className="react-calendar"
          minDate={new Date(Date.UTC("2020", "07", "07", "23", "31", "30"))}
          maxDate={new Date(Date.UTC("2020", "07", "15", "23", "31", "30"))}
        />
        {/* this is the option to see all the events if the user wants */}
        <button onClick={() => setInitialLoad(true)} className="show-all-btn">
          Show All
        </button>
        <img
          src={require("./images/camping.svg")}
          alt="Camping SVG"
          className="campground"
        />
      </div>

      {/* events */}
      {!initialLoad && curEvents.length > 0 ? (
        // handles for showing events on a certain date
        <div className="events">
          <h1 className="head-title">
            {months[date.getMonth()]} {date.getDate().toString()} -{" "}
            {days[date.getDay()]}
          </h1>
          {curEvents.map((event) => {
            return <EventInfo key={event.id} event={event} />;
          })}
        </div>
      ) : initialLoad ? (
        // handles for showing all the events
        <div className="events">
          <h1 className="head-title">All HackThis Events!</h1>
          {events.map((event) => {
            return <EventInfo key={event.id} event={event} />;
          })}
        </div>
      ) : (
        // handles if there are no events
        <div className="events">
          <h1>Oops, it doesn't seem we have events this day.</h1>
        </div>
      )}

      {/* footer with social-media icons */}
      <footer className="footer">
        <p className="footer-follow-msg">
          Make sure to follow us on social media!{" "}
        </p>
        <a href="https://hackthis.hackillinois.org/" target="_blank">
          <FontAwesomeIcon icon={faHSquare} className="sm-icons" />
        </a>
        <a href="https://www.facebook.com/hackillinois/" target="_blank">
          <FontAwesomeIcon icon={faFacebook} className="sm-icons" />
        </a>
        <a href="https://twitter.com/hackillinois?lang=en" target="_blank">
          <FontAwesomeIcon icon={faTwitter} className="sm-icons" />
        </a>
        <a
          href="https://www.linkedin.com/company/hackillinois/?originalSubdomain=in"
          target="_blank"
        >
          <FontAwesomeIcon icon={faLinkedin} className="sm-icons" />
        </a>
        <a href="https://discord.com/invite/VX8TYQx" target="_blank">
          <FontAwesomeIcon icon={faDiscord} className="sm-icons" />
        </a>
      </footer>
    </div>
  );
};

export default App;
