import axios from "axios";

export const signUpUser = async (data) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/signup`, data);
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
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/signin`, data);
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
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/google`, data);
    if (res.success === false) {
      console.log(res.message);
      return;
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const userUpdate = async(data,id) =>{
  try{
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/update/${id}`,data);
    if(res.success===false)
    {
      console.log(res.message);
      return;
    }
    return res.data;
  }catch(error)
  {
    console.log(error);
  }
}

export const getUserDetails = async(id)=>
{
  try{
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/get/${id}`);
    if(res.success===false)
    {
      console.log(res.message);
      return;
    }
    return res.data;
  }catch(error)
  {
    console.log(error);
  }
}