import axios from "axios";

export const getAllAccount=()=>async dispatch=>
{
    console.log("I am here");
  try {
      const res=await axios.get(`${config.api_url}/account`);
      console.log("Calling Get All Account");
      console.log(res);
      dispatch ({
          type:'GET_Account',
          payload:res.data
      });
  } catch (err) {
      dispatch ({
          type:'Error in  calling API',
          payload:{msg:err.response.statusText,status:err.response.status}
      }); 
  }
}

