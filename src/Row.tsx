import "./Row.css";
import React, { useEffect, useState } from "react";
import axios from "./axios";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
}

interface RowProps {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
  lazyLoad?: boolean;
}

function Row({
  title,
  fetchUrl,
  isLargeRow = false,
  lazyLoad = false,
}: RowProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
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
                loading={lazyLoad ? "lazy" : undefined}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
