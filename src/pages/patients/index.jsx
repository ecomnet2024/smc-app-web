import { Box, Button, LinearProgress, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

import { useMutation, useQuery } from '@apollo/client';

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
import DeleteButton from "../../components/DeleteButton";
import { REMOVE_PATIENT_BY_ID } from "../../graphql/mutations";
import { PATIENT_MANY } from "../../graphql/queries";
import FilterableTable from "../../components/TableTest";
import { useUser } from "../../context/authContext";





const Patients = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState('');

  const { user } = useUser()

  // console.log("User ", user.role.name)

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRoleFilterChange = (event) => {
    setFilterRole(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };


  // ------------------------------------------


  const { loading, error, data } = useQuery(PATIENT_MANY);
 

 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [PatientRemoveById, {error : errorRemove}] = useMutation(REMOVE_PATIENT_BY_ID)

  const delte = async (id) => {  
    
    try {
      const response = await PatientRemoveById({
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


  if(loading){
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  if(errorRemove | error){
    return <p className="text-red-500">{ error.cause.name } : {error.cause.message}</p>
  }

  console.log("patient data ", data)



  const filteredData = data.patientMany.filter((item) => {
    return (
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
      (item.status === filterStatus || filterStatus === '')
    );
  });



  return (
    <Box m="20px">

      <Header title="Patients List" subtitle="List of Invoice Balances" />


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
            </Select>
          </FormControl>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Serial number</TableCell>
                { user.role.name == "Super Admin" && (
                <TableCell>Name</TableCell>
                )}
                <TableCell>Email</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Detail</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.sn}</TableCell>
                    { user.role.name == "Super Admin" && (
                    <TableCell>{item.name}</TableCell>
                    )}
                    
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.age}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                        <a href={`/patient/${item._id}`} className="mx-auto">
                          <Button type="submit" variant="contained" color="secondary">
                            open
                          </Button>
                        </a>
                    </TableCell>
                    <TableCell>
                      <DeleteButton onDelete={() => delte(item._id)}/>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="flex items-center justify-center">
                  <TableCell colSpan={4} align="center" >
                    No data found
                    <img src="/assets/nodata.jpg" alt="" className="w-[30vw] mx-auto "/>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* <div>
        <FilterableTable />
      </div> */}

    </Box>
  );
};

export default Patients;