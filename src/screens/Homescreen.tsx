import React from "react";
import "./Homescreen.css";
import Nav from "../Nav";
import Banner from "../Banner";
import Row from "../Row";
import requests from "../Requests";

function Homescreen() {
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
        lazyLoad={true}
      />
      <Row
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
        lazyLoad={true}
      />
      <Row
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
        lazyLoad={true}
      />
      <Row
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
        lazyLoad={true}
      />
      <Row
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
        lazyLoad={true}
      />
      <Row
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
        lazyLoad={true}
      />
    </div>
  );
}

export default Homescreen;
