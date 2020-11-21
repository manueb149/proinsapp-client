import axios from '../../http-common';

const upload = async (file, onUploadProgress, type) => {
  let formData = new FormData();

  formData.append("file", file);

  return await axios.post(`/${type}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getFiles = async () => {
  return await axios.get("/files");
};

const getTrucks = async () => {
  return await axios.get("/trucks");
};

export default {
  upload,
  getFiles,
  getTrucks
};