import React, { useLayoutEffect, useRef } from "react";
import UIkit from "uikit";

export default function Card({ src, onClick, active }) {
  const cardRef = useRef(null);
  useLayoutEffect(() => {
    UIkit.scrollspyNav(cardRef.current, {});
  }, []);
  return (
    <div
      style={{
        marginBottom: "25px",
        display: "flex",
        justifyContent: "center"
      }}
      onClick={onClick}
    >
      {/* <div
        className="uk-card uk-card-default uk-card-body uk-card-hover"
        style={{
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          height: "300px",
          width: "300px"
        }}
      /> */}
      <div
        className={`card uk-card uk-card-default uk-card-body ${
          active ? "active" : ""
        }`}
        uk-scrollspy="cls: uk-animation-slide-left; repeat: true"
        ref={cardRef}
      >
        <div className="content">
          <div className="front" />
          <div className="back">
            <img src={src} alt={src} />
          </div>
        </div>
      </div>
    </div>
  );
}
