import axios from "axios";
import { getAuthToken } from "../utils/register";

export const signUpUser = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/auth/signup`,
      data
    );
    if (res.success === false) {
      console.log(res.message);
      return;
    }
    
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const signInUser = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/auth/signin`,
      data
    );
    if (res.success === false) {
      console.log(res.message);
      return;
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const googleSignIn = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/auth/google`,
      data
    );
    if (res.success === false) {
      console.log(res.message);
      return;
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const userUpdate = async (data, id) => {
  let token = getAuthToken();
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/user/update/${id}`,
      data,
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    if (res.success === false) {
      console.log(res.message);
      return;
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  let token = getAuthToken();
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    if (res.success === false) {
      console.log(res.message);
      return;
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
