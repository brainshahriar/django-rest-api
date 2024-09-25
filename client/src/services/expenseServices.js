import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// All category

const allExpenses = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${BACKEND_URL}/api/expenses`, config);
  return response.data;
};

// Create a new category

const createExpense = async (formData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${BACKEND_URL}/api/expenses`,
    formData,
    config
  );
  return response.data;
};

// Get a expense
const getExpense = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${BACKEND_URL}/api/expenses/${id}`, config);
  return response.data;
};

// Delete a category

const deleteExpense = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    `${BACKEND_URL}/api/expenses/${id}`,
    config
  );
  return response.data;
};

// Update a category

const updateExpense = async (id, formData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${BACKEND_URL}/api/expenses/${id}`,
    formData,
    config
  );
  return response.data;
};

//search by date

const searchByDate = async (formData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${BACKEND_URL}/api/expenses/search`,
    formData,config
  );
  return response.data;
};


const expenseServices = {
  allExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
  searchByDate
};
export default expenseServices;
