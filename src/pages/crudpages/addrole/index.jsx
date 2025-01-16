import { Alert, Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CREATE_ROLE_ONE } from "../../../graphql/mutations"; 


import { useMutation } from '@apollo/client';
import Header from "../../../components/Header";
import { useState } from "react";


// Define mutation


const initialValues = {
    description: "",
    name: "",
}


// const phoneRegExp =/^[\+]?[0-9]{0,3}\W?+[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

// Form control schema

const userSchema = yup.object().shape({
    name: yup.string().required("required"),
    description: yup.string().required("required"),
    // email: yup.string().email("Invalid email").required("required"),
    // phoneNumber: yup.string().required("required"),
    // region: yup.string().required("required"),
    // street_location: yup.string().required("required"),
    // password: yup.string().required("required"),
})

const AddRole = () => {

    const [age, setAge] = useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };


    const isNonMobile = useMediaQuery("(min-width:600px)")


    const [roleCreateOne, { data, loading, error }] = useMutation(CREATE_ROLE_ONE);

    const handleFormSubmit = async (values) => {
        console.log(values)


        await roleCreateOne({variables: {
          record: values
        }})
    }

    const items = ['Pomme', 'Banane', 'Orange', 'Mangue', 'Ananas', 'Pastèque'];

    return( 
        <Box sx={{padding: "0px 10%"}}>

            <Header title="Create role"/> 

            { loading && <p>Clinic creation Loading...</p>}
            { data && <Alert severity="success" className="mb-3">the roleCreateOne has been successfully created</Alert>}
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
                          label="description"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.blood_pressure}
                          name="description"
                          error={!!touched.description && !!errors.cdescription}
                          helperText={touched.description && errors.description}
                          sx={{ gridColumn: "span 4" }}
                        />

                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                              Create New role
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}


export default AddRole