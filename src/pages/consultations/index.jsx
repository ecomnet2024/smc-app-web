import { Box, Button, LinearProgress,useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

import { useMutation, useQuery } from '@apollo/client';

import { CONSULTATION_MANY } from "../../graphql/queries";
import { REMOVE_CONSULTATION } from "../../graphql/mutations";


// Data table import
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
} from '@mui/material';
import { useState } from "react";

import { useUser } from "../../context/authContext";
import DeleteButton from "../../components/DeleteButton";


// Query 


const Consultations = () => {

  const {user} = useUser();


  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleStatusFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };


  const { loading, error, data } = useQuery(CONSULTATION_MANY);

  const [consultationRemoveById ] = useMutation(REMOVE_CONSULTATION)

  const delte = async (id) => {  
    
    try {
      const response = await consultationRemoveById({
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

  console.log("patient ", data.consultationMany.patient)

  if(error){
    return <p className="text-red-500">{ error.cause.name } : {error.cause.message}</p>
  }

  console.log("consultation data ", data)


  const filteredData = data.consultationMany.filter((item) => {
    return (
      (item.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
      // (item.emergency === filterRole || filterRole === '') &&
      (item.status === filterStatus || filterStatus === '')
    );
  });


  return (
    <Box m="20px">
      <Header title="Consultations List" subtitle="" />



      <div style={{ paddingTop: 20 }}>

        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{marginBottom: "60px"}}
          />

          <FormControl size="small" variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              onChange={handleStatusFilterChange}
              label="Status"
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="In_Review">In_Review</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Emergency</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell>Hour</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Detail</TableCell>
                {/* {( user.role.name == "Admin" || user.role.name == "Super Admin"  ) &&
                <TableCell>Action</TableCell>
                } */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.patient.sn}</TableCell>
                    <TableCell>{item.emergency && "True"} {!item.emergency && "False"}</TableCell>
                    <TableCell>{new Date(item.createdAt).toISOString().split("T")[0]}</TableCell>
                    <TableCell>{(new Date(item.createdAt).toISOString().split("T")[1]).split('.')[0]}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                        <a href={`/consultation/${item._id}`} className="flex items-center justify-center">
                          <Button type="submit" variant="contained" color="secondary">
                            open
                          </Button>
                        </a>
                    </TableCell>
                    {( user.role.name == "Admin" || user.role.name == "Super Admin" || user.role.name == "Doctor" ) && 
                    <TableCell>

                      <DeleteButton onDelete={() => delte(item._id)}/>
                    </TableCell>
                    }
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No data found
                    <img src="/assets/nodata.jpg" alt="" className="w-[30vw] mx-auto "/>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    </Box>
  );
};

export default Consultations;