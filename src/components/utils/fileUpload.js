import axios from '../../config/http-common';

const upload = async (file, onUploadProgress, type, fileName) => {
  let formData = new FormData();
  formData.append("file", file);
  if(fileName) formData.append("aseg", fileName.aseguradora)
  if(fileName) formData.append("plan", fileName.plan)

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

const fileUpload = {
  upload,
  getFiles,
  getTrucks
}

export default fileUpload;