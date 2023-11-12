import "./Row.css";
import React, { useEffect, useState } from "react";
import axios from "./axios";
import MoreInfo from "./screens/MoreInfo";
import { useNavigate } from "react-router-dom";

function Row({ title, fetchUrl, isLargeRow = false, lazyLoad = false }) {
  const [movies, setMovies] = useState([]);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const base_url = "https://image.tmdb.org/t/p/original/";
  const navigate = useNavigate();

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
                  navigate("/title", {
                    replace: true,
                    state: {
                      movieName: movie.name,
                      movieOverview: movie.overview,
                      movieImage: `${base_url}${
                        isLargeRow ? movie.poster_path : movie.backdrop_path
                      }`,
                    },
                  });
                }}
                loading={lazyLoad ? "lazy" : ""}
              />
            )
        )}
      </div>
      {showMoreInfo && <MoreInfo />}
    </div>
  );
}

export default Row;
