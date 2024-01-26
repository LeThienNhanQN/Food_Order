import React, { useState } from "react";
import classes from "./CommentItem.module.css";

const CommentItem = (props) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    if (props.onCommentChange) {
      props.onCommentChange(event.target.value);
    }
  };

  const handleCommentSubmit = () => {
    if (props.onSubmitComment) {
      props.onSubmitComment();
      setComment(""); // Clear the comment field after submitting
    }
  };

  return (
    <div>
      <textarea
        placeholder="Leave a comment..."
        value={comment}
        onChange={handleCommentChange}
      />
      <button className={classes.submitButton} onClick={handleCommentSubmit}>
        Submit Comment
      </button>
    </div>
  );
};

export default CommentItem;
