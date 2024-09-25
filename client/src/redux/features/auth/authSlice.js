import { createSlice } from "@reduxjs/toolkit";

// const name = JSON.parse(localStorage.getItem("name"));
// console.log(name)

const initialState = {
  isLoggedIn: false,
  user: {
    username: "",
    email: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      // localStorage.setItem("name", JSON.stringify(action.payload));
      state.user.username = action.payload;
    },
    SET_EMAIL(state, action) {
        // localStorage.setItem("email", JSON.stringify(action.payload));
        state.user.email = action.payload;
    }
  },
});


export const {SET_LOGIN,SET_NAME,SET_EMAIL} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.user.username;
export const selectUser = (state) => state.auth.user;


export default authSlice.reducer;