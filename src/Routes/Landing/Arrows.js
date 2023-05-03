import React from "react";

function Arrows({ prevSlide, nextSlide }) {
  return (
    <div className="arrows">
      <span className="under" onClick={prevSlide}>
      &#8595;
      </span>
    </div>
  );
}

export default Arrows;
