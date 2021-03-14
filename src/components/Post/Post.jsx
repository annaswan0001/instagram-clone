import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import firebase from "firebase";

const Post = (props) => {
  const { userName, caption, imgUrl, postId } = props.postData;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timeStamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => unsubscribe();
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      userName: props.user.displayName,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          src="https://pic.sport.ua/images/news/0/12/155/orig_511003.jpg"
          alt="avatar"
        />
        <h4>{userName}</h4>
      </div>

      <img className="post__img" src={imgUrl} alt="post img" />
      <div className="post__text">
        <strong>{userName}</strong> {caption}
      </div>

      <div className="post__comments">
        {comments.map((comment) => {
          return (
            <p key={comment.timeStamp}>
              <strong>{comment.userName}</strong> {comment.text}
            </p>
          );
        })}
      </div>
      {props.user && (
        <form className="post__form">
          <input
            placeholder="Add a comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="post__input"
          />
          <button
            onClick={postComment}
            type="submit"
            disabled={!comment}
            className="post__button"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
