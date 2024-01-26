import React, { useContext, useState, useEffect } from "react";
import MealItemForm from "./MealItemForm";
import RateItem from "./RateItem";
import CommentItem from "./CommentItem";
import CommentDisplay from "./CommentDisplay";
import classes from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
      rating: rating,
      comment: comment,
    });
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (newComment) => {
    setComment(newComment);
  };

  const loadComments = async () => {
    try {
      setIsLoadingComments(true);
      const response = await fetch(
        `https://food-oder-a43e5-default-rtdb.firebaseio.com/comment-meals/${props.id}/comments.json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch comments.");
      }

      const data = await response.json();
      const loadedComments = [];

      for (const key in data) {
        loadedComments.push({ id: key, ...data[key] });
      }

      setComments(loadedComments);
      setIsLoadingComments(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setIsLoadingComments(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const submitRatingAndComment = async () => {
    if (comment.trim() === "" || rating === 0) {
      return;
    }

    try {
      const response = await fetch(
        `https://food-oder-a43e5-default-rtdb.firebaseio.com/comment-meals/${props.id}/comments.json`,
        {
          method: "POST",
          body: JSON.stringify({
            content: comment,
            rating: rating,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit rating and comment.");
      }

      setRating(0);
      setComment("");
      loadComments();
    } catch (error) {
      console.error("Error submitting rating and comment:", error);
    }
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{props.price}</div>
        <div>
          <MealItemForm onAddToCart={addToCartHandler} />
          <RateItem onRatingChange={handleRatingChange} />
          <CommentItem
            onCommentChange={handleCommentChange}
            onSubmitComment={submitRatingAndComment}
          />
          <CommentDisplay
            isLoadingComments={isLoadingComments}
            comments={comments}
          />
        </div>
      </div>
    </li>
  );
};

export default MealItem;
