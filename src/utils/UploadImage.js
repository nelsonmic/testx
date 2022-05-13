import axios from "axios";

async function UploadImagesToServer(target, changeImage, setErrorMessage) {
  const formData = new FormData();
  formData.append("file", target);
  changeImage(URL.createObjectURL(target));

  try {
    let res = await axios.post(
      `${process.env.REACT_APP_BASE}/upload/files`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          // "redirect": "follow",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    changeImage(res.data.data);
  } catch (err) {
    setErrorMessage(err.response.data.data.file[0]);
  }
}

export default UploadImagesToServer;
