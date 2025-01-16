import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";

import { gql, useMutation } from '@apollo/client';


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

const UpdateUser = () => {


    const isNonMobile = useMediaQuery("(min-width:600px)")


    const [userCreateOne, { data, loading, error }] = useMutation(CREATE_USER_ONE);

    const handleFormSubmit = async (values) => {
        console.log(values)

        await userCreateOne({variables: {
          record: values
        }})
    }


    return( 
        <Box sx={{padding: "0px 10%"}}>
            <Header title="USER NAME" subtiltle="Edit your Profile"/>

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
                              Update
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}


export default UpdateUser