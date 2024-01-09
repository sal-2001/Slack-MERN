import axios from "axios";
import { getAuthToken } from "../utils/register";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getAllMessages = async (chatId) => {
  let token = getAuthToken();
  try {
    const res = await axios.get(`${BASE_URL}/api/message/${chatId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    if (res.success === false) {
      console.log(res.message);
      return;
    }
    console.log("res : ", res.data);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

const sendMessage = async (message) => {
  let token = getAuthToken();
  try {
    const res = await axios.post(`${BASE_URL}/api/message`, message, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    if (res.success === false) {
      console.log(res.message);
      return;
    }
    console.log("res : ", res.data);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export { getAllMessages, sendMessage };
