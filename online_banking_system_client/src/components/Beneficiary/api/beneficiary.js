import axios from "axios";

export const getAllBeneficiary=()=>async dispatch=>
{
    console.log("I am here");
  try {
      const res=await axios.get(`${config.api_url}/beneficiary`);
      console.log("Calling Get All Beneficiary");
      console.log(res);
      dispatch ({
          type:'GET_Beneficiary',
          payload:res.data
      });
  } catch (err) {
      dispatch ({
          type:'Error in  calling API',
          payload:{msg:err.response.statusText,status:err.response.status}
      }); 
  }
}

