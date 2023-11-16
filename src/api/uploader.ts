export const uploadImage = async (file: File) => {
  const preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string;
  const url = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL as string;
  let formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", preset);
  return fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json().then((data) => data.url))
    .catch((error) => console.log("업로드에 실패했습니다."));
};
