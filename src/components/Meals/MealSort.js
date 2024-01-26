import React from "react";
import classes from "./MealSort.module.css";

const MealSort = (props) => {
  return (
    <div className={classes.sort}>
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" value={props.sortOption} onChange={props.onSortChange}>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
    </div>
  );
};

export default MealSort;
