import { Box, Button, LinearProgress, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

import { gql, useMutation, useQuery } from '@apollo/client';
import { REMOVE_USER} from "../../graphql/mutations";

import { USER_MANY } from "../../graphql/queries";
import DeleteButton from "../../components/DeleteButton";



const Users = () => {

  const { loading, error, data } = useQuery(USER_MANY);
 
  const [roleRemoveById] = useMutation(REMOVE_USER)
 
  const delte = async (id) => {  
    
    try {
      const response = await roleRemoveById({
        variables: {
          id
        }
      })
      console.log("Mutation successful", response.data)
      // window.location.reload();
    }catch(err) {
      console.error("Mutation failed: ", err)
    }

  }





  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if(loading){
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress color="secondary"/>
      </Box>
    );
  }

  if(error){
    return <p className="text-red-400"> Server error </p>
  }

  console.log("Users ", data.userMany)


  return (
    <Box m="20px">
      <Header title="Users" subtitle="List of Invoice Balances" />

      <a href="/form">
        <Button type="submit" variant="contained" color="secondary">
          Add User
        </Button>
      </a>




      <table class="min-w-full table-auto border-collapse border border-gray-300 mt-24">
        <thead>
          <tr class="bg-none">
            <th class="border border-gray-300 px-4 py-2">Name</th>
            <th class="border border-gray-300 px-4 py-2">Email</th>
            <th class="border border-gray-300 px-4 py-2">Phone</th>
            <th class="border border-gray-300 px-4 py-2">Address</th>
            <th class="border border-gray-300 px-4 py-2">Created At</th>
            <th class="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>

          { data.userMany.map((user) => (
          <tr key={user._id}>
            <td class="border border-gray-300 px-4 py-2">{user.first_name}</td>
            <td class="border border-gray-300 px-4 py-2">{user.email}</td>
            <td class="border border-gray-300 px-4 py-2">{user.phone}</td>
            <td class="border border-gray-300 px-4 py-2">{user.address}</td>
            <td class="border border-gray-300 px-4 py-2">{ new Date(user.updatedAt).toISOString().split("T")[0]}</td>
            <td class="border border-gray-300 px-4 py-2">
              <DeleteButton onDelete={() => delte(user._id)}/>
            </td>
        </tr>
        ))}
       </tbody>
       </table> 
    </Box>
  );
};

export default Users;