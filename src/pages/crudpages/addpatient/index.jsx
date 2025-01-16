import { Box, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";

import { gql, useMutation } from '@apollo/client';


// Define mutation
const CREATE_PATIENT_ONE = gql`
mutation PatientCreateOne($record: CreateOnePatientInput!) {
    patientCreateOne(record: $record) {
      record {
        _id
        gender
        name
        status
        age
      }
    }
  }
`;


const initialValues = {
    age: 0,
    gender: "",
    email: "",
    location: "",
    phone: "",
    status: "",
    name: ""
}


// const phoneRegExp =/^[\+]?[0-9]{0,3}\W?+[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

// Form control schema

const userSchema = yup.object().shape({
    age: yup.number().required("required"),
    gender: yup.string().required("required"),
    email: yup.string().email("Invalid email").required("required"),
    location: yup.string().required("required"),
    phone: yup.string().required("required"),
    status: yup.string().required("required"),
    name: yup.string().required("required")
})

const AddPatient = () => {


    const isNonMobile = useMediaQuery("(min-width:600px)")


    const [patientCreateOne, { data, loading, error }] = useMutation(CREATE_PATIENT_ONE);

    const handleFormSubmit = async (values) => {
        console.log(values)

        await patientCreateOne({variables: {
          record: values
        }})
    }

    if(loading) {
        return <p className="text-white text-2xl">
            Creation loading ...
        </p>
    }


    return( 
        <Box sx={{padding: "0px 10%"}}>
            <Header title="CREATE PATIENT" subtiltle="Create a New Patient Profile"/>

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
                          label="Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          name="name"
                          error={!!touched.last_name && !!errors.last_name}
                          helperText={touched.last_name && errors.last_name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="age"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.age}
                          name="age"
                          error={!!touched.country && !!errors.country}
                          helperText={touched.country && errors.country}
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
                          label="Location"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.location}
                          name="location"
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
                          <MenuItem value="M">M</MenuItem>
                          <MenuItem value="F">F</MenuItem>
                        </Select>

                        <InputLabel id="select-label">Status</InputLabel>
                        <Select
                          labelId="select-label"
                          id="select"
                          name="status"
                          onBlur={handleBlur}
                          value={values.status}
                          onChange={handleChange}
                          label="Choisir une option"
                        >
                          <MenuItem value="New">New</MenuItem>
                          <MenuItem value="Returning">Returning</MenuItem>
                        </Select>

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


export default AddPatient