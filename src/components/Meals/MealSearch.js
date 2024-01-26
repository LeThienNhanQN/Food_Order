import React from "react";
import classes from "./MealSearch.module.css";

const MealSearch = (props) => {
  return (
    <div className={classes.search}>
      <input
        type="text"
        placeholder="Search meals..."
        value={props.searchInput}
        onChange={props.onSearchChange}
      />
    </div>
  );
};

export default MealSearch;
