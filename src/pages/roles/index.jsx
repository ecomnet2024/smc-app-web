import { Box, Button, LinearProgress, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

import { useMutation, useQuery } from '@apollo/client';


import { ROLE_MANY } from "../../graphql/queries"; 
import { REMOVE_ROLE } from "../../graphql/mutations"; 
import DeleteButton from "../../components/DeleteButton";



// Query 


const Roles = () => {

  const { loading, error, data } = useQuery(ROLE_MANY);

  const [roleRemoveById] = useMutation(REMOVE_ROLE)

  const delte = async (id) => {  
    
    try {
      const response = await roleRemoveById({
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
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  if(error){
     return <p className="text-red-500">Server error </p>
    console.log("Error ", error)
  }

  console.log("Roles many ", data)


  return (
    <Box m="20px">
      <Header title="Roles List" subtitle="" />

      <a href="/addrole">
        <Button type="submit" variant="contained" color="secondary">
          Add Role
        </Button>
      </a>

    {/* <UserProfile /> */}


      <table class="min-w-full table-auto border-collapse border border-gray-300 mt-24">
        <thead>
          <tr class="bg-none">
            <th class="border border-gray-300 px-4 py-2">name</th>
            <th class="border border-gray-300 px-4 py-2">description</th>
            <th class="border border-gray-300 px-4 py-2">createdAt</th>
            {/* <th class="border border-gray-300 px-4 py-2">Phone number</th> */}
            <th class="border border-gray-300 px-4 py-2">action</th>
          </tr>
        </thead>
        <tbody>

          { data.roleMany.map((role) => (
          <tr key={role._id} >
            <td class="border border-gray-300 px-4 py-2">{role.name}</td>
            <td class="border border-gray-300 px-4 py-2 text-center" >{role.description}</td>
            <td class="border border-gray-300 px-4 py-2"> { new Date(role.createdAt).toISOString().split("T")[0]}</td>
            {/* <td class="border border-gray-300 px-4 py-2">{clinic.phoneNumber}</td> */}
            <td class="border border-gray-300 px-4 py-2">
              {/* <Button type="submit" variant="contained" color="error" onClick={() => delte(role._id)}>
                Delete
              </Button> */}
              <DeleteButton onDelete={() => delte(role._id)}/>
            </td>
        </tr>
        ))}
       </tbody>
       </table> 
    </Box>
  );
};

export default Roles;