import axios from "axios";

export const getAllKyc=()=>async dispatch=>
{
    console.log("I am here");
  try {
      const res=await axios.get(`${config.api_url}/kyc`);
      console.log("Calling Get All Kyc");
      console.log(res);
      dispatch ({
          type:'GET_Kyc',
          payload:res.data
      });
  } catch (err) {
      dispatch ({
          type:'Error in  calling API',
          payload:{msg:err.response.statusText,status:err.response.status}
      }); 
  }
}

