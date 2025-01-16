import { Box, Button, CircularProgress, FormLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";



import { gql, useMutation, useQuery } from '@apollo/client';

import Alert from '@mui/material/Alert';
import { useContext } from "react";

import { Navigate } from "react-router-dom";

import { CREATE_USER_ONE } from "../../graphql/mutations";
import { ROLE_MANY } from "../../graphql/queries";
 

// Define mutation


// Query 
// const ROLE_MANY = gql`
//   query RoleMany {
//     roleMany {
//       name
//     }
//   }
// `;


const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    gender: "",
    role: "",
    password: ""
}


// const phoneRegExp =/^[\+]?[0-9]{0,3}\W?+[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

// Form control schema

// password 6 caracteres 

const userSchema = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    email: yup.string().email("Invalid email").required("required"),
    phone: yup.string().required("required"),
    address: yup.string().required("required"),
    country: yup.string().required("required"),
    gender: yup.string().required("required"),
    role: yup.string().required("required"),
    password: yup.string().required("required"),
})

const Form = () => {

    

   
    const isNonMobile = useMediaQuery("(min-width:600px)")

    const [userCreateOne, { loading : loadinguser, error : erroruser , data : datauser } ] = useMutation(CREATE_USER_ONE);
    const { loading : loadingrole, error : errorrole , data : datarole } = useQuery(ROLE_MANY);

    const handleFormSubmit = async (values) => {
        console.log(values)

        await userCreateOne({variables: {
          record: values
        }})

        // Navigate("/users")
    }





    if(loadinguser | loadingrole){
      return (
        <Box sx={{ width: '100%', height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <CircularProgress color="secondary" size="3rem"/>
        </Box>
      );
    }


    if(errorrole | erroruser) {
      return <p className="text-red-500"> Erreur lors du chargement </p>
    }

    console.log("Roles ", datarole)


    return(
      
        <Box sx={{padding: "0px 10%"}}>

            <Header title="CREATE USER" subtiltle="Create a New User Profile"/>

            {loadinguser && <Box sx={{ width: '100%', height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}><CircularProgress color="secondary" size="3rem"/></Box>}
            { datauser && <Alert severity="success" className="mb-3">the user has been successfully created</Alert>}
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={userSchema}
            >
                {({
                    values, 
                    errors, 
                    touched, 
                    handleBlur, 
                    handleChange, 
                    handleSubmit
                }) => (
                    <form onSubmit={handleSubmit}>
                        
                        <Box
                         display="grid"
                         gap="30px"
                         gridTemplateColumns="repeat(4, minmax(0, 1fr ))"
                         sx={{
                            "& > div": { gridColumn: isNonMobile? undefined : " span 4" }
                         }}
                        >
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="First Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.first_Name}
                          name="first_name"
                          error={!!touched.first_name && !!errors.first_name}
                          helperText={touched.first_name && errors.first_name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Last Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.last_Name}
                          name="last_name"
                          error={!!touched.last_name && !!errors.last_name}
                          helperText={touched.last_name && errors.last_name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          name="email"
                          error={!!touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Contact Number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.phone}
                          name="phone"
                          error={!!touched.phone && !!errors.phone}
                          helperText={touched.phone && errors.phone}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Address"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.address}
                          name="address"
                          error={!!touched.address && !!errors.address}
                          helperText={touched.address && errors.address}
                          sx={{ gridColumn: "span 4" }}
                        />

                        {/* Select field */}

                        <InputLabel id="select-label">Gender</InputLabel>
                        <Select
                          labelId="select-label"
                          id="select"
                          name="gender"
                          onBlur={handleBlur}
                          value={values.gender}
                          onChange={handleChange}
                          label="Choisir une option"
                        >
                          <MenuItem value="M">Man</MenuItem>
                          <MenuItem value="F">Woman</MenuItem>
                        </Select>

                        <InputLabel id="select">Role</InputLabel>
                        <Select
                          labelId="select"
                          id="selectRole"
                          name="role"
                          onBlur={handleBlur}
                          value={values.role}
                          onChange={handleChange}
                          label="Choisir une option"
                        >

                          { datarole.roleMany.map((role) => (
                            role.name != "Super Admin" &&  <MenuItem value={role._id}>{role.name}</MenuItem>
                          ))}
                         
                          <MenuItem value="Partners">Partners</MenuItem>
                        </Select>
                        {/* ------------------- */}
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="country"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.country}
                          name="country"
                          error={!!touched.country && !!errors.country}
                          helperText={touched.country && errors.country}
                          sx={{ gridColumn: "span 4" }}
                        />

                      <TextField
                          fullWidth
                          variant="filled"
                          type="password"
                          label="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          name="password"
                          error={!!touched.password && !!errors.password}
                          helperText={touched.password && errors.password}
                          sx={{ gridColumn: "span 4" }}
                        />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                              Create New User
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>  

      
    )
}


export default Form