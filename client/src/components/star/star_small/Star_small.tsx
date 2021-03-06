import React, { useState } from "react";
import "./Star_small.css";

interface Iprops {
  rating: number;
}

function Star_avg(props: Iprops) {
  return (
    <>
      <div className="star_small-box">
        <div className="star_small-rating">
          <span
            className={`star_small-background star_small-rating-size${props.rating}`}
          ></span>
        </div>
      </div>
    </>
  );
}

export default Star_avg;
