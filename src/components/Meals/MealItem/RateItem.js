import React, { useState } from "react";
import classes from "./RateItem.module.css";

const RateItem = (props) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (props.onRatingChange) {
      props.onRatingChange(newRating);
    }
  };

  return (
    <div className={classes.rate}>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={rating >= value ? classes.activeStar : classes.star}
          onClick={() => handleRatingChange(value)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default RateItem;
