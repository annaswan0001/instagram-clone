import "./App.css";
import Post from "./components/Post/Post";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import Modal from '@material-ui/core/Modal';
function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapShot) => {
      setPosts(
        snapShot.docs.map((doc) => {
          return { ...doc.data(), userId: doc.id };
        })
      );
    });
  }, []);

  console.log(posts);

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        Руддщ
      </Modal>
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="headerImg"
          className="app__headerImg"
        />
      </div>
      {posts.length > 0 &&
        posts.map((post) => {
          return <Post key={post.userId} postData={post} />;
        })}
    </div>
  );
}

export default App;
