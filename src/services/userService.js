import axios from 'axios';

const apiBaseUrl = 'http://localhost:8080/users';

export const createSystemAdmin = async (name, email) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/createSystemAdmin`, { name, email });
    return response.data;
  } catch (error) {
    throw error;
  }
};