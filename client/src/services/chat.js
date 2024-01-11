import axios from "axios";
import { getAuthToken } from "../utils/register";

export const getUserChats = async (id) => {
  let token = getAuthToken();
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/chat/${id}`,
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
    console.log("res", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addUserToChat = async (recieverId) => {
  let token = getAuthToken();
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/chat`,
      {
        recieverId,
      },
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
    console.log("res", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createGroupChat = async (data) => {
  let token = getAuthToken();
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/chat/group`,
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
    console.log("res", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
