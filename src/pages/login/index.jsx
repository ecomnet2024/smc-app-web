import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { USER_LOGIN } from "../../graphql/mutations";
import { useUser } from "../../context/authContext";


import { gql, useMutation } from '@apollo/client';


import { useNavigate } from "react-router-dom";




const initialValues = {
    email: "",
    password: ""
}


const userSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("required"),
    password: yup.string().required("required"),
})

const Login = () => {

    let navigate = useNavigate()
    const { updateUser } = useUser()
    


    const isNonMobile = useMediaQuery("(min-width:600px)")


    const [UserLogin, { data, loading, error }] = useMutation(USER_LOGIN);

    const handleFormSubmit = async (values) => {


        try{

           const { data } = await UserLogin({variables: {
                email: values.email,
                password: values.password
              }})

              if(error) {
                console.log("Error ", error)
              }

              if(loading){
                console.log("Loding ", loading)
              }

             


              
              console.log("Login Data ", data.userLogin.message)
              
              
              const token = await data.userLogin.token
              const expirationTime = Date.now() + 3600 * 1000;
             

              if(token) {

               
                localStorage.setItem("token", token)
                localStorage.setItem('expirationTime', expirationTime);
                updateUser(token)

                navigate("/")
               

                
              }

        }catch(e){
            console.log("Erreur de connexion", e)
        }

    }


    return(
        
        <div className=" h-screen">

            <div className="w-full h-full flex ">
                <div className="sm:w-2/3 bg-[#141b2d] hidden sm:flex items-center justify-center ">
                    <div>
                        <img src="/assets/logomapubi.png" alt="" />
                    </div>
                </div>

                <div className="w-full sm:w-1/3 flex flex-row sm:flex-col justify-center items-center">
                    <Box sx={{padding: "0px 10%", width: "90%"}}>
                            
                            <h1 className="text-center text-7xl mb-8 font-semibold text-bg-[#141b2d]">Log In</h1>
                            {loading && <Box sx={{display: "flex", width: "100%", justifyContent: "center", margin: "10px"}}> <CircularProgress /> </Box>}
                            {(data && data.userLogin.message == "Failed login attempt") && <p className="text-red-400 text-center mb-3">Incorrect password or email address. Please verify and  try again</p>}
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
                                        <Box display="flex" justifyContent="center" mt="20px">
                                            <Button type="submit"  variant="contained" className="w-full bg-[#141b2d] rounded-none" disabled={loading}>
                                            Login
                                            </Button>
                                        </Box>
                                    </form>
                                )}
                            </Formik>
                    </Box>
                </div>
            </div>

        </div>

    )
}


export default Login