import React from "react";

export default function MoreInfo({
  movieName,
  movieOverview,
  movieImage,
  setShowMoreInfo,
}) {
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <div className="moreInfoPopup">
      <div onClick={() => setShowMoreInfo(false)} style={{ fontSize: "9rem" }}>
        X
      </div>
      <div
        style={{
          position: "absolute",
          fontSize: "5rem",
          color: "white",
          width: "100dvw",
          height: "100dvh",
          backgroundColor: "black",
          // opacity: ".5",
          zIndex: "999",
        }}
      >
        <div style={{ display: "flex" }}>
          <div>
            <h2>{movieName}</h2>
            <p>{truncate(movieOverview, 150)}</p>
          </div>
          <img
            src={movieImage}
            alt=""
            style={{ height: "40px", width: "20px" }}
          />
        </div>
      </div>
    </div>
  );
}
