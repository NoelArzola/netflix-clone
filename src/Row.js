import "./Row.css";
import React, { useEffect, useState } from "react";
import axios from "./axios";
import MoreInfo from "./screens/MoreInfo";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [movieName, setMovieName] = useState("");
  const [movieOverview, setMovieOverview] = useState("");
  const [movieImage, setMovieImage] = useState("");
  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                key={movie.id}
                onClick={() => {
                  setMovieOverview(movie.overview);
                  setMovieName(movie.name);
                  setMovieImage(
                    `${base_url}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`
                  );
                  setShowMoreInfo(true);
                }}
              />
            )
        )}
      </div>
      {showMoreInfo && (
        <MoreInfo
          movieName={movieName}
          movieOverview={movieOverview}
          movieImage={movieImage}
          setShowMoreInfo={setShowMoreInfo}
        />
      )}
    </div>
  );
}

export default Row;
