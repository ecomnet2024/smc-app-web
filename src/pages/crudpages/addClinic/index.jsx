import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CREATE_CLINIC_ONE } from "../../../graphql/mutations";


import { gql, useMutation } from '@apollo/client';
import Header from "../../../components/Header";
import { useState } from "react";
import DropdownWithSearch from "../../global/Table";
import { useUser } from "../../../context/authContext";




// Define mutation


const initialValues = {
    city: "",
    name: "",
    phoneNumber: "",
    region: "",
    street_location: ""
}


// const phoneRegExp =/^[\+]?[0-9]{0,3}\W?+[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

// Form control schema

const userSchema = yup.object().shape({
    name: yup.string().required("required"),
    city: yup.string().required("required"),
    // email: yup.string().email("Invalid email").required("required"),
    phoneNumber: yup.string().required("required"),
    region: yup.string().required("required"),
    street_location: yup.string().required("required"),
    // password: yup.string().required("required"),
})

const AddClinic = () => {

    const [age, setAge] = useState('');
    const {user} = useUser();    

    const handleChange = (event) => {
      setAge(event.target.value);
    };


    const isNonMobile = useMediaQuery("(min-width:600px)")


    const [ClinicCreateOne, { data, loading, error }] = useMutation(CREATE_CLINIC_ONE);

    const handleFormSubmit = async (values) => {
        console.log(values)
        const data1 = {...values, createdBy: user.user_id}


        await ClinicCreateOne({variables: {
          record: data1
        }})
    }

    const items = ['Pomme', 'Banane', 'Orange', 'Mangue', 'Ananas', 'Pastèque'];

    return( 
        <Box sx={{padding: "0px 10%"}}>

            <Header title="Create clinic"/> 

            { loading && <p>Clinic creation Loading...</p>}
            { data && <Alert severity="success" className="mb-3">the clinic has been successfully created</Alert>}
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
                          label="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.allergies}
                          name="name"
                          error={!!touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="city"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.blood_pressure}
                          name="city"
                          error={!!touched.city && !!errors.city}
                          helperText={touched.city && errors.city}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Phone number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.complain}
                          name="phoneNumber"
                          error={!!touched.phoneNumber && !!errors.phoneNumber}
                          helperText={touched.phoneNumber && errors.phoneNumber}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Region"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.medications}
                          name="region"
                          error={!!touched.region && !!errors.region}
                          helperText={touched.region && errors.region}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Street location"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.pulse}
                          name="street_location"
                          error={!!touched.street_location && !!errors.street_location}
                          helperText={touched.street_location && errors.street_location}
                          sx={{ gridColumn: "span 4" }}
                        />

                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                              Create New clinic
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}


export default AddClinic