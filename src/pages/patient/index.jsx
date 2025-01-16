import { gql, useMutation, useQuery } from "@apollo/client";
import Header from "../../components/Header"
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Navigate, useParams } from "react-router-dom";

import * as yup from "yup";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button } from "@mui/material";
import { useState } from "react";

import { PATIENT_BY_ID } from "../../graphql/queries"; 
import { CONSULATATION_MANY_FILTER } from "../../graphql/queries";
import { UPDATE_PATIENT_STATUS } from "../../graphql/mutations";






const initialValues = {
    allergies: "",
    blood_pressure: "",
    complain: "",
    medications: "",
    pulse: "",
    status: "",
    temperature: 0
}

const userSchema = yup.object().shape({
    allergies: yup.string().required("required"),
    blood_pressure: yup.string().required("required"),
    complain: yup.string().required("required"),
    medications: yup.string().required("required"),
    pulse: yup.string().required("required"),
    status: yup.string().required("required"),
    temperature: yup.number().required("required"),
})



const Patient = () => {

    const { id } = useParams();

    const test = id

    console.log("ID ", test)

    const isNonMobile = useMediaQuery("(min-width:600px)")


    const theme = useTheme();

    const [status, setStatus] = useState('');

    const {error : errorpatient , loading : loadingpatient, data : datapatient } = useQuery(PATIENT_BY_ID, {
      variables: {id}
    });

    const {error : errorconsultation , loading : loadingconsultation, data : dataconsultation } = useQuery(CONSULATATION_MANY_FILTER, {
      variables:{
        filter: {
          patient: id
        }
      }
    });

    const [patientUpdateById] = useMutation(UPDATE_PATIENT_STATUS)

    if(errorconsultation | errorpatient ) {
      return <p className="text-red-500"> Server error</p>
    }

    const handlChange = async (event) => {
      setStatus(event.target.value);
      let test = event.target.value
      

      try {
        const { data } = await patientUpdateById({  
            variables: {
            id: id,
            record: {
              status: test,
              clinic: "6731ba62f599cdbbd71aac7a"
            }
          }} 
        )
        
        window.location.reload();
        console.log("Status ",event.target.value)
      }catch(err) {
        console.log("Error went updating ", err)
      }

    };
    

    const colors = tokens(theme.palette.mode);

    // --------------------------- select

    

    const handleChange = (event) => {
      setStatus(event.target.value);
    };
  
        
    console.log("patient data ", datapatient)

    if(errorpatient ){
      console.log("error ", errorpatient)
    }

    if(loadingpatient | loadingconsultation){
        return <p>Loading</p>
    }

    console.log("Mechant test ", dataconsultation)


    return (


        <div className="flex flex-col justify-center w-[50sw] p-[5%] sm:p-[10%]">
            
            <Header title={datapatient.patientById.name}/>
            <div className="w-full flex flex-col p-8 gap-6 mb-11">
                
                <div className="flex flex-row-reverse gap-4">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={handlChange}
                      >
                        <MenuItem value="New">New</MenuItem>
                        <MenuItem value="Returning">Returning</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  {/* <Box>
                    <Button children="Update patient" variant="contained" color="secondary" className="h-full"/>
                  </Box> */}
                </div>


                <div className="flex flex-col gap-4 w-full px-[3%] py-[2%] bg-blue-100">
                    <div className="flex  items-center gap-4">
                        <span className="text-xl font-semibold">Name :   </span>
                        <h1 className="text-xl text-start  ">{datapatient.patientById.name}</h1>
                    </div>

                    <div className="flex  items-center gap-4 ">
                        <span className="text-xl font-semibold">Age  :   </span>
                        <h1 className="text-xl text-start  ">{datapatient.patientById.age} ans</h1>
                    </div>
                    <div className="flex  items-center gap-4 ">
                        <span className="text-xl font-semibold">Clinic :   </span>
                        <h1 className="text-xl text-start  ">{datapatient.patientById.clinic}</h1>
                    </div>
                    <div className="flex  items-center gap-4 ">
                        <span className="text-xl font-semibold">email :   </span>
                        <h1 className="text-xl text-start  ">{datapatient.patientById.email}</h1>
                    </div>

                    <div className="flex  items-center gap-4 ">
                        <span className="text-xl font-semibold">gender :   </span>
                        <h1 className="text-xl text-start  ">{datapatient.patientById.gender}</h1>
                    </div>
                    <div className="flex  items-center gap-4 ">
                        <span className="text-xl font-semibold">insurance number :   </span>
                        <h1 className="text-xl text-start  ">{datapatient.patientById.insurance_number}</h1>
                    </div>
                    <div className="flex  items-center gap-4 ">
                        <span className="text-xl font-semibold">Phone :   </span>
                        <h1 className="text-xl text-start  ">{datapatient.patientById.phone}</h1>
                    </div>
                    <div className="flex  items-center gap-4 ">
                        <span className="text-xl font-semibold">Status :   </span>
                        <h1 className="text-xl text-start  ">{datapatient.patientById.status}</h1>
                    </div>
                    <div className="flex  items-center gap-4 ">
                        <span className="text-xl font-semibold">Create at :   </span>
                        <h1 className="text-xl text-start  ">{new Date(datapatient.patientById.createdAt).toISOString().split("T")[0]}</h1>
                    </div>
                </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold">Consultations list of {datapatient.patientById.name}</h1>

              {dataconsultation.consultationMany.map((consultation) => (
                <div className="flex flex-col gap-4 w-full px-[3%] py-[2%] bg-[#eeeff1] my-4 ">
                  
                    <div className="flex  items-center gap-4 ">
                        <span className="text-xl font-semibold">complain :   </span>
                        <h1 className="text-xl text-start  ">{consultation.complain}</h1>
                    </div>
                    <div className="flex  items-center gap-4 ">
                        <span className="text-xl font-semibold">created At :   </span>
                        <h1 className="text-xl text-start  ">{new Date(consultation.createdAt).toISOString().split("T")[0]}</h1>
                    </div>

                    <div className="flex  items-center gap-4 ">
                        <span className="text-lg font-semibold text-blue-400"><a href={`/consultation/${consultation._id}`}> More details </a></span>
                    </div>

                </div>
              ))}
            </div>

        </div>
    )
}


export default Patient