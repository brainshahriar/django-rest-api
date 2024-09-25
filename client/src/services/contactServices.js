import axios from "axios";

let BACKEND_URL;

try {
  BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  await axios.get(BACKEND_URL);
} catch (error) {
  BACKEND_URL = "https://django-rest-api-roo0.onrender.com";
}

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

// Create a new contact

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

// Get a contact
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

// Delete a contact

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

// Update a contact

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
