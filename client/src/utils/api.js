import axios from "axios";

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`/api/users/signin`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const signUp = async (name, email, password, userType) => {
  try {
    const response = await axios.post(`/api/users/signup`, {
      name,
      email,
      password,
      userType,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
