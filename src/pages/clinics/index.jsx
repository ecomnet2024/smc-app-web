import { Box, Button, CircularProgress, LinearProgress, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

import { useMutation, useQuery } from '@apollo/client';


import { CLINIC_MANY } from "../../graphql/queries";
import { REMOVE_CLINIC } from "../../graphql/mutations"; 
import DeleteButton from "../../components/DeleteButton";



// Query 


const Clinics = () => {

  const { loading, error, data } = useQuery(CLINIC_MANY);

  const [clinicRemoveById] = useMutation(REMOVE_CLINIC)

  const delte = async (id) => {  
    
    try {
      const response = await clinicRemoveById({
        variables: {
          id
        }
      })
      console.log("Mutation successful", response.data)
      window.location.reload();
    }catch(err) {
      console.error("Mutation failed: ", err)
    }

  }

 

 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  if(loading){
    return (
      <Box sx={{ width: '100%', height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <CircularProgress color="secondary" size="3rem"/>
      </Box>
    );
  }

  if(error){
    // return <p className="text-red-500">Une erreur est survennue </p>
    console.log("Error ", error)
  }

  console.log("consultation data ", data)


  return (
    <Box m="20px">
      <Header title="Clinic List" subtitle="" />

      <a href="/addclinic">
        <Button type="submit" variant="contained" color="secondary">
          Add clinic
        </Button>
      </a>

    {/* <UserProfile /> */}


      <table className="min-w-full table-auto border-collapse border border-gray-300 mt-24">
        <thead>
          <tr className="bg-none">
            <th className="border border-gray-300 px-4 py-2">Patient Name</th>
            <th className="border border-gray-300 px-4 py-2">City</th>
            <th className="border border-gray-300 px-4 py-2">createdAt</th>
            <th className="border border-gray-300 px-4 py-2">Phone number</th>
            <th className="border border-gray-300 px-4 py-2">action</th>
          </tr>
        </thead>
        <tbody>

          { data.clinicMany.map((clinic) => (
          <tr key={clinic._id} >
            <td className="border border-gray-300 px-4 py-2">{clinic.name}</td>
            <td className="border border-gray-300 px-4 py-2 text-center" >{clinic.city}</td>
            <td className="border border-gray-300 px-4 py-2">{ new Date(clinic.createdAt).toISOString().split("T")[0]}</td>
            <td className="border border-gray-300 px-4 py-2">{clinic.phoneNumber}</td>
            <td className="border border-gray-300 px-4 py-2">
              {/* <Button type="submit" variant="contained" color="error" onClick={() => delte(clinic._id)}>
                Delete
              </Button> */}
              <DeleteButton onDelete={() => delte(clinic._id)}/>
            </td>
        </tr>
        ))}
       </tbody>
       </table> 
    </Box>
  );
};

export default Clinics;