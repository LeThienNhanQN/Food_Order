import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you're using React Router

import classes from "./AvailableMealDetails.module.css";

const AvailableMealDetails = () => {
  const params = useParams(); // Get the route parameters, assuming you have a parameter named 'mealId'
  const mealId = params.mealId; // Extract the mealId from the parameters

  const [mealDetails, setMealDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(
          `https://food-oder-a43e5-default-rtdb.firebaseio.com/food-meals/${mealId}.json`
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();

        setMealDetails(responseData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchMealDetails();
  }, [mealId]);

  let content = <p>Loading meal details...</p>;

  if (!isLoading && mealDetails) {
    content = (
      <div className={classes.mealDetails}>
        <h2>{mealDetails.name}</h2>
        <p>{mealDetails.description}</p>
        <p>Price: ${mealDetails.price}</p>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default AvailableMealDetails;
