import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

export const getAlbums = async () => {
  const r = await api.get("/albums");
  return r.data;
};

export const getPhotosByAlbum = async (albumId) => {
  const r = await api.get(`/photos?albumId=${albumId}`);
  return r.data;
};

export const getUsers = async () => {
  const r = await api.get("/users");
  return r.data;
};
