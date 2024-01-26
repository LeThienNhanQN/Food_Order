import React, { useState } from "react";
import classes from "./CommentDisplay.module.css";

const CommentDisplay = ({ isLoadingComments, comments }) => {
  const [showComments, setShowComments] = useState(false);

  const toggleShowComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  const anonymousAvatars = [
    "https://imgs.search.brave.com/4QP6vTyCV-RT5zOVezSDF7y_oztDjtVNFxPKhkdesQk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS93M2ltYWdlcy9h/dmF0YXIyLnBuZw",
    "https://imgs.search.brave.com/bHpTjt49BE6IN6GPjmIm4FaNZXFj4xFH3ey8KXtPew0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw",
    "https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_1280.png",
    "https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk",
    "https://eu.ui-avatars.com/api/?name=John+Doe&size=250",
    "https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg",
    "https://robohash.org/mail@ashallendesign.co.uk",
    "https://baconmockup.com/250/250/",
    "https://placekitten.com/250/250",
    "https://placebeard.it/250/250",
  ];

  const anonymousNames = [
    "Nụ Cười Nắng",
    "Mặt Hồng Diễm",
    "Nhím Nhím Đáng Yêu",
    "Ăn Bông Cỏ",
    "Bước Nhẹ Nhàng",
    "Bánh Ngọt Ngào",
    "Cười Nghiêng Ngả",
    "Mặt Trời Tươi",
    "Quả Mận Ngọt",
    "Bé Kẹo Bông",
  ];

  return (
    <div className={classes.commentsList}>
      <h4
        onClick={toggleShowComments}
        className={`${classes.commentTitle} ${
          showComments ? classes.active : ""
        }`}
      >
        {showComments ? "▲" : "▼"}
        <span className={classes.commentTitleText}>
          {showComments ? "Hide Comments" : "Show Comments"}
        </span>
      </h4>
      {showComments && (
        <div className={classes.commentContainer}>
          {isLoadingComments ? (
            <p>Loading comments...</p>
          ) : (
            comments.map((comment) => {
              const randomIndex = Math.floor(
                Math.random() * anonymousAvatars.length
              );
              const randomAvatar = anonymousAvatars[randomIndex];
              const randomName = anonymousNames[randomIndex];

              return (
                <div key={comment.id} className={classes.comment}>
                  <div className={classes.commentUser}>
                    <img
                      src={randomAvatar}
                      alt="User"
                      className={classes.commentUserImage}
                    />
                    <p className={classes.commentUserName}>{randomName}</p>
                  </div>
                  <p className={classes.commentRating}>
                    Rating: {comment.rating}
                  </p>
                  <p className={classes.commentContent}>{comment.content}</p>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default CommentDisplay;
