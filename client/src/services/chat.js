import axios from 'axios';

export const getUserChats = async(id)=>{
    try{
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/chat/${id}`);
        if(res.success === false)
        {
            console.log(res.message);
            return;
        }
        return res.data;
    }
    catch(error)
    {
        console.log(error);
    }
}