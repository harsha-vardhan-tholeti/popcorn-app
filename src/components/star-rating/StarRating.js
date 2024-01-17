import React, { useState } from "react";
import Star from "../star/Star";

const starRating = {
  display: "flex",
  flexDirection: "row",
  fontSize: "24px",
  alignItems: "center",
};

const stars = {
  marginRight: "10px",
  display: "flex",
};

function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleStarRating = (id) => {
    setRating(id);
    onSetRating(id);
  };

  const handleTempStarRatingIn = (id) => {
    setTempRating(id);
  };
  const handleTempStarRatingOut = () => {
    setTempRating(0);
  };

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={starRating}>
      <div style={stars}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleStarRating(i + 1)}
            onHoverIn={() => handleTempStarRatingIn(i + 1)}
            onHoverOut={handleTempStarRatingOut}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
          />
        ))}
      </div>
      <div style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || 0}
      </div>
    </div>
  );
}

export default StarRating;
