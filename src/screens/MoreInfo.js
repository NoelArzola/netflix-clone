import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MoreInfo.css";
import Nav from "../Nav";

export default function MoreInfo() {
  const location = useLocation();
  const history = useNavigate();
  const movie = location.state;
  const movieName = movie.movieName;
  const movieOverview = movie.movieOverview;
  const movieImage = movie.movieImage;

  return (
    <main
      style={{
        backgroundImage: `url("${movieImage}")`,
        backgroundColor: "black",
      }}
    >
      <Nav />
      <div className="moreInfo">
        <div className="moreInfo__wrapper">
          <div className="moreInfo__text">
            <h1>{movieName}</h1>
            <p>{movieOverview}</p>
            <div className="continueWatching continueWatching--large">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                  style={{ fill: "#000000", marginRight: ".5rem" }}
                >
                  <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                </svg>
                Resume
              </span>
              <div className="continueWatching__progressBar">
                <div className="continueWatching__progressBar__progress"></div>
              </div>
            </div>
          </div>
          <img
            src={movieImage}
            alt=""
            style={{ height: "400px", width: "270px" }}
          />
        </div>

        <div className="continueWatching continueWatching--small">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              style={{ fill: "#000000", marginRight: ".5rem" }}
            >
              <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
            </svg>
            Resume
          </span>
          <div className="continueWatching__progressBar">
            <div className="continueWatching__progressBar__progress"></div>
          </div>
        </div>
        <span
          className="goBack"
          onClick={() => history("/", { replace: true })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
            style={{ marginRight: ".5rem", fill: "#ffffff" }}
          >
            <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" />
          </svg>
          {`Back to home`}
        </span>
      </div>
    </main>
  );
}
