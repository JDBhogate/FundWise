import axios from "axios";

export const getAllTransaction=()=>async dispatch=>
{
    console.log("I am here");
  try {
      const res=await axios.get(`${config.api_url}/transaction`);
      console.log("Calling Get All Transaction");
      console.log(res);
      dispatch ({
          type:'GET_Transaction',
          payload:res.data
      });
  } catch (err) {
      dispatch ({
          type:'Error in  calling API',
          payload:{msg:err.response.statusText,status:err.response.status}
      }); 
  }
}

