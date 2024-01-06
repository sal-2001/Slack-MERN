import axios from "axios";
const BASE_URL = "http://localhost:8000/api";

export const signUpUser = async (data)=>{
    const res = await axios.post(`${BASE_URL}/auth/signup`,data);
    if(res.success===false)
    {
      console.log(res.message);
      return;
    }
} 
export const signInUser = async (data)=>{
  const res = await axios.post(`${BASE_URL}/auth/signin`,data);
  if(res.success===false)
  {
    console.log(res.message);
    return;
  }
}