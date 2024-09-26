import axios from "axios";

let BACKEND_URL;

BACKEND_URL = process.env.REACT_APP_BACKEND_URL

// All contacts

const allContacts = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${BACKEND_URL}/api/contacts/`, config);
  return response.data;
};

// Create a new category

const createContact = async (formData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${BACKEND_URL}/api/contacts/`,
    formData,
    config
  );
  return response.data;
};

// Get a category
const getContact = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${BACKEND_URL}/api/contacts/${id}`, config);
  return response.data;
};

// Delete a category

const deleteContact = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    `${BACKEND_URL}/api/contacts/${id}/`,
    config
  );
  return response.data;
};

// Update a category

const updateContact = async (id, formData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    `${BACKEND_URL}/api/contacts/${id}/`,
    formData,
    config
  );
  return response.data;
};

const contactServices = {
  allContacts,
  createContact,
  getContact,
  deleteContact,
  updateContact,
};

export default contactServices;
