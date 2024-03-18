import React, { useState } from "react";
import { updateImage } from "../../Service/axiosService";
import axios from "axios";
import ProgressBar from "@ramonak/react-progress-bar";

function AddImage() {
  const [selectImage, setImage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileChange = (e) => {
    setImage(e.target.files[0]);
  };

  //   const saveImage = async () => {
  //     const formData = new FormData();
  //     formData.append("image", selectImage);
  //     formData.append("_id", "65f7cc994b3e73d48d0f1b41");
  //     try {
  //       const response = await updateImage(formData);
  //       if (response) {
  //         console.log("Update Successfully");
  //       } else console.log("Error!");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", selectImage);
    formData.append("_id", "65f7cc994b3e73d48d0f1b41");

    axios
      .put("http://localhost:3500/user", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      })
      .then((response) => {
        console.log(response.data);
        setUploadProgress(0);
      })
      .catch((error) => {
        console.error("Error uploading image: ", error);
      });
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Add Profile Image</h1>
      <input
        onChange={fileChange}
        type="file"
        style={{ marginTop: "30px", width: "250px" }}
      ></input>
      <button onClick={handleUpload} style={{ marginBottom: "30px" }}>
        Upload
      </button>
      {uploadProgress > 0 ? (
        <ProgressBar width=" 50%" margin="50px" completed={uploadProgress} />
      ) : null}
    </div>
  );
}

export default AddImage;
