import Button from "@material-ui/core/Button";
import { useState } from "react";
import { db, storage } from "../../firebase";
import firebase from "firebase";
import './ImageUpload.css'
const ImageUpload = ({ userName }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapchot) => {
        const prs = Math.round(
          (snapchot.bytesTransferred / snapchot.totalBytes) * 100
        );
        setProgress(prs);
      },
      (error) => alert(error.message),
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption,
              imgUrl: url,
              userName,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <progress className="imageUpload__progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <Button type="outline" onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default ImageUpload;
