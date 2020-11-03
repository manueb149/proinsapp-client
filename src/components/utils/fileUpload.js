import axios from '../../http-common';

const upload = async (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  return await axios.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getFiles = async () => {
  return await axios.get("/files");
};

export default {
  upload,
  getFiles,
};