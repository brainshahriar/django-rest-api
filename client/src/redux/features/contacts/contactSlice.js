import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactServices from "../../../services/contactServices";
const initialState = {
  contact: null,
  contacts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessages: [],
  message: [],
};
// get all contacts

export const getAllContact = createAsyncThunk(
  "contact/get-all",
  async (_, thunkAPI) => {
    try {
      return await contactServices.allContacts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createContact = createAsyncThunk(
    "contact/create",
  async (formData, thunkAPI) => {
    try {
      return await contactServices.createContact(formData);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get single contact
export const getContact = createAsyncThunk(
  "contact/get-single-contact",
  async (id, thunkAPI) => {
    try {
      return await contactServices.getContact(id);
    } catch (error) {
      const message = error.response.data.errors;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// // update single contact
export const updateContact = createAsyncThunk(
    "contact/update-contact",
    async ({ id, formData }, thunkAPI) => {
      try {
        return await contactServices.updateContact(id, formData);
      } catch (error) {
        const message = error.response.data;
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  // // delete single contact
export const deleteContact = createAsyncThunk(
    "contact/delete-contact",
    async (id, thunkAPI) => {
      try {
        return await contactServices.deleteContact(id);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    CONTACT_ERROR_MESSAGE(state, action) {
      state.errorMessages = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.contacts = action.payload;
      })
      .addCase(getAllContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessages = action.payload;
      })
      .addCase(getContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.contact = action.payload;
      })
      .addCase(getContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContact.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessages = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { CONTACT_ERROR_MESSAGE } =
  contactSlice.actions;

export const selectContact = (state) => state.contact.contact;
export const selectIsLoading = (state) => state.contact.isLoading;

export default contactSlice.reducer;
