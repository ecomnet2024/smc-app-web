import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";


import { gql, useMutation } from '@apollo/client';
import Header from "../../../components/Header";
import { useState } from "react";
import DropdownWithSearch from "../../global/Table";


// Define mutation

const CREATE_USER_ONE = gql`
mutation UserCreateOne($record: CreateOneUserInput!) 
{
    userCreateOne(record: $record) {
        record {
          country
          email
          first_name
          last_name
          password
          phone
        }
        recordId
      }
  }
`;


const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    password: "",
}


// const phoneRegExp =/^[\+]?[0-9]{0,3}\W?+[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

// Form control schema

const userSchema = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    email: yup.string().email("Invalid email").required("required"),
    phone: yup.string().required("required"),
    address: yup.string().required("required"),
    country: yup.string().required("required"),
    password: yup.string().required("required"),
})

const AddConsultation = () => {

    const [age, setAge] = useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };


    const isNonMobile = useMediaQuery("(min-width:600px)")


    const [userCreateOne, { data, loading, error }] = useMutation(CREATE_USER_ONE);

    const handleFormSubmit = async (values) => {
        console.log(values)

        await userCreateOne({variables: {
          record: values
        }})
    }

    const items = ['Pomme', 'Banane', 'Orange', 'Mangue', 'Ananas', 'Pastèque'];

    return( 
        <Box sx={{padding: "0px 10%"}}>
            <Header title="Create consultation"/> 

            <div >
                          <span>Select patient</span>
                          <DropdownWithSearch items={items} />
                        </div>  


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
                          label="Allergies"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.allergies}
                          name="allergies"
                          error={!!touched.allergies && !!errors.allergies}
                          helperText={touched.allergies && errors.allergies}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="blood pressure"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.blood_pressure}
                          name="blood_pressure"
                          error={!!touched.blood_pressure && !!errors.blood_pressure}
                          helperText={touched.blood_pressure && errors.blood_pressure}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="complain"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.complain}
                          name="complain"
                          error={!!touched.complain && !!errors.complain}
                          helperText={touched.complain && errors.complain}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="medications"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.medications}
                          name="medications"
                          error={!!touched.medications && !!errors.medications}
                          helperText={touched.medications && errors.medications}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="pulse"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.pulse}
                          name="pulse"
                          error={!!touched.pulse && !!errors.pulse}
                          helperText={touched.pulse && errors.pulse}
                          sx={{ gridColumn: "span 4" }}
                        />

                        {/* Select field */}

                        <InputLabel id="select-label">Status</InputLabel>
                        <Select
                            labelId="select-label"
                            id="select"
                            name="status"
                            onBlur={handleBlur}
                            value="New"
                            onChange={handleChange}
                            label="Choisir une option"
                          >
                              <MenuItem value="New">New</MenuItem>
                              <MenuItem value="Closed">Closed</MenuItem>
                          </Select>


                        {/* ------------------- */}
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="temperature"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.temperature}
                          name="temperature"
                          error={!!touched.temperature && !!errors.temperature}
                          helperText={touched.temperature && errors.temperature}
                          sx={{ gridColumn: "span 2" }}
                        />

                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                              Create New consultation
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}


export default AddConsultation