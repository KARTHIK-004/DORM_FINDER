import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signIn = async (email, password) => {
  try {
    const response = await api.post(`/users/signin`, { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const signUp = async (name, email, password, userType) => {
  try {
    const response = await api.post(`/users/signup`, {
      name,
      email,
      password,
      userType,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const logout = async () => {
  try {
    const response = await api.post(`/users/logout`);
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get(`/users/me`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const uploadImages = async (formData) => {
  try {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const createListing = async (listingData) => {
  try {
    const response = await api.post("/listings", listingData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getListings = async () => {
  try {
    const response = await api.get("/listings");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
};

export const getListing = async (id) => {
  try {
    const response = await api.get(`/listings/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateListing = async (id, listingData) => {
  try {
    const response = await api.patch(`/listings/${id}`, listingData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteListing = async (id) => {
  try {
    const response = await api.delete(`/listings/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
