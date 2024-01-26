import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import MealSearch from "./MealSearch";
import MealSort from "./MealSort";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [searchResultsEmpty, setSearchResultsEmpty] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://food-oder-a43e5-default-rtdb.firebaseio.com/food-meals.json"
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();

        const loadedMeals = [];

        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }

        setMeals(loadedMeals);
        setIsLoading(false);
        setFilteredMeals(loadedMeals);
      } catch (error) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    fetchMeals();
  }, []);
  // handle Search Change
  const handleSearchChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    const filtered = meals.filter((meal) =>
      meal.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSearchResultsEmpty(filtered.length === 0); // Check if search results are empty
    setFilteredMeals(filtered);
  };
  // handle Sort Change
  const handleSortChange = (event) => {
    const sortOptionValue = event.target.value;
    setSortOption(sortOptionValue);

    const sortedMeals = [...filteredMeals].sort((a, b) => {
      if (sortOptionValue === "price") {
        return a[sortOptionValue] - b[sortOptionValue];
      } else {
        return a[sortOptionValue].localeCompare(b[sortOptionValue]);
      }
    });
    // handle Meals Items

    // set filtered meals
    setFilteredMeals(sortedMeals);
  };

  let content = (
    <ul>
      {filteredMeals.map((meal) => (
        <MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
        />
      ))}
    </ul>
  );

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (httpError) {
    content = <p>{httpError}</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <div className={classes.container}>
          <MealSearch
            searchInput={searchInput}
            onSearchChange={handleSearchChange}
          />
          <MealSort sortOption={sortOption} onSortChange={handleSortChange} />
        </div>
        {searchResultsEmpty ? <p>No meals found.</p> : content}
      </Card>
    </section>
  );
};

export default AvailableMeals;
