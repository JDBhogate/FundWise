import axios from "axios";

export const getAllTransfer=()=>async dispatch=>
{
    console.log("I am here");
  try {
      const res=await axios.get(`${config.api_url}/transfer`);
      console.log("Calling Get All Transfer");
      console.log(res);
      dispatch ({
          type:'GET_Transfer',
          payload:res.data
      });
  } catch (err) {
      dispatch ({
          type:'Error in  calling API',
          payload:{msg:err.response.statusText,status:err.response.status}
      }); 
  }
}

