import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5067/api",
});

export const lessonsApi = {
    getAll: (page = 1, pageSize = 3) => api.get("/Lessons", {params: { page, pageSize} }),
    getById: (id) => api.get(`/Lessons/${id}`),
    create: (data) => api.post("/Lessons", data),
    update: (id, data) => api.put(`/Lessons/${id}`, data),
    delete: (id) => api.delete(`/Lessons/${id}`)
};