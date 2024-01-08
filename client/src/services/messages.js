import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getAllMessages = async (chatId) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/message/${chatId}`);
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
  try {
    const res = await axios.post(`${BASE_URL}/api/message`, message);
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
