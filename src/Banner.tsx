import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "./axios";
import requests from "./Requests";
import { useNavigate } from "react-router-dom";

interface Movie {
  backdrop_path: string;
  title?: string;
  name?: string;
  original_title?: string;
  overview: string | undefined;
  poster_path: string;
}

function Banner() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(string: string, n: number) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`,
        backgroundPosition: "top center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title ?? movie?.name ?? movie?.original_title}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button banner__button__play">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="Hawkins-Icon Hawkins-Icon-Standard"
            >
              <path
                d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
                fill="currentColor"
              ></path>
            </svg>{" "}
            Play
          </button>
          <button
            className="banner__button banner__button__my-list"
            onClick={() => {
              navigate("/title", {
                replace: true,
                state: {
                  movieName:
                    movie?.title ?? movie?.name ?? movie?.original_title,
                  movieOverview: movie?.overview,
                  movieImage: `https://image.tmdb.org/t/p/original/${movie?.poster_path}`,
                },
              });
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="Hawkins-Icon Hawkins-Icon-Standard"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
                fill="currentColor"
              ></path>
            </svg>{" "}
            More Info
          </button>
        </div>
        <h2 className="banner__description">
          {movie?.overview
            ? truncate(movie?.overview, 150)
            : "No description available"}
        </h2>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
