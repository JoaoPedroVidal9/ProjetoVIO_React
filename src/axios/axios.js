import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: {
    accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers.authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const sheets = {
  getUsers: () => api.get("user"),
  postLogin: (user) => api.post("user/login/", user),
  deleteUser: (id) => api.delete("user/" + id),
  getEvents: () => api.get("evento"),
  deleteEvent: (id) => api.delete("evento/" + id),
  createIngresso: (ingresso) => api.post("ingresso/", ingresso),
};

export default sheets;
