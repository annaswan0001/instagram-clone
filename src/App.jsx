import "./App.css";
import Post from "./components/Post/Post";
import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [openSignUp, toggleModalSignUp] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, toggleModalSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        console.log(authUser);
        if (authUser.displayName) {
        } else {
          return authUser.updateProfile({
            displayName: userName,
          });
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [userName, user]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapShot) => {
      setPosts(
        snapShot.docs.map((doc) => {
          return { ...doc.data(), userId: doc.id };
        })
      );
    });
  }, []);

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
    toggleModalSignUp(false);
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
    toggleModalSignIn(false);
  };

  return (
    <div className="app">
      <Modal
        open={openSignUp}
        onClose={() => toggleModalSignUp(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="headerImg"
              className="app__headerImg"
            />
            <form className="app__signup">
              <Input
                type="text"
                placeholder="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>
                SignUp
              </Button>
            </form>
          </center>
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => toggleModalSignIn(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="headerImg"
              className="app__headerImg"
            />
            <form className="app__signup">
              <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn}>
                SignIn
              </Button>
            </form>
          </center>
        </div>
      </Modal>
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="headerImg"
          className="app__headerImg"
        />
      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}>Log out</Button>
      ) : (
        <div className="app__loginContainer">
          <Button onClick={() => toggleModalSignIn(true)}>Sign in</Button>
          <Button onClick={() => toggleModalSignUp(true)}>Sign up</Button>
        </div>
      )}
      {posts.length > 0 &&
        posts.map((post) => {
          return <Post key={post.userId} postData={post} />;
        })}
    </div>
  );
}

export default App;
