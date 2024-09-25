import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../redux/features/auth/authSlice";

const isTokenExpired = (token) => {
  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true;
  }
};

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const redirectLoggedOutUser = () => {
      if (token) {
        if (isTokenExpired(token)) {
          console.log("Token expired, redirecting to login.");
          localStorage.removeItem("token");
          dispatch(SET_LOGIN(false));
          navigate(path);
          return;
        }
        dispatch(SET_LOGIN(true));
      } else {
        console.log("No token found, redirecting to login.");
        navigate(path);
      }
    };

    redirectLoggedOutUser();
  }, [navigate, dispatch, path]);
};

export default useRedirectLoggedOutUser;
