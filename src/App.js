import React, { useState, useEffect } from "react";
import {
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
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(
    // new Date(Date.UTC("2020", "07", "07", "23", "31", "30"))
    // new Date(1596864950 * 1000)
    new Date(1593993600 * 1000)
  );
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

  const returnDate = (unix) => {
    const javaScriptDate = new Date(unix * 1000);
    return javaScriptDate.getDate();
  };

  const changeCurEvents = (date) => {
    const newCurEvents = events.filter((event) => {
      if (returnDate(event.startTime) == date.getDate()) {
        return 1;
      } else {
        return 0;
      }
    });
    return newCurEvents;
  };

  useEffect(() => {
    // extract the events
    fetch("https://api.hackillinois.org/event/")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data["events"]);
        console.log(date, date.getMonth());
        setCurEvents(changeCurEvents(date));
      });
  }, []);

  useEffect(() => {
    const newEvents = changeCurEvents(date);
    setCurEvents(newEvents);
  }, [date]);

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

      <div className="calendar">
        <Calendar
          value={date}
          onChange={onDateChange}
          className="react-calendar"
          minDate={
            // new Date(Date.UTC("2020", "07", "07", "23", "31", "30"))
            new Date(1596864950 * 1000)
          }
          maxDate={new Date(Date.UTC("2020", "07", "15", "23", "31", "30"))}
        />
        <button onClick={() => setInitialLoad(true)} className="show-all-btn">
          Show All
        </button>
        <img src={require("./images/camping.svg")} className="campground" />
      </div>

      {/* main content with the events and the calendar div */}
      {!initialLoad && curEvents.length > 0 ? (
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
        <div className="events">
          <h1 className="head-title">All HackThis Events!</h1>
          {events.map((event) => {
            return <EventInfo key={event.id} event={event} />;
          })}
        </div>
      ) : (
        <div className="events">
          <h1>Oops, it doesn't seem we have events this day.</h1>
        </div>
      )}

      <div className="quote">
        <h3>
          “A computer once beat me at chess, but it was no match for me at kick
          boxing.”
        </h3>
        <h3>— Emo Philips</h3>
      </div>

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
      </footer>
    </div>
  );
};

export default App;
