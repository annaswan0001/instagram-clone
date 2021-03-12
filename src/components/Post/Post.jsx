import "./Post.css";
import Avatar from "@material-ui/core/Avatar";



const Post = (props) => {
  const {userName, capture, avatarUrl, imgUrl} = props.postData
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          src={avatarUrl}
          alt="avatar"
        />
        <h4>{userName}</h4>
      </div>

      <img
        className="post__img"
        src={imgUrl}
        alt="post img"
      />
      <div className="post__text">
        <strong>{userName}</strong> {capture}
      </div>
    </div>
  );
};

export default Post;
