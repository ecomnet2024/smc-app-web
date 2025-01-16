import { gql, useMutation, useQuery } from "@apollo/client";
import Header from "../../components/Header"
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useParams } from "react-router-dom";
import { 
  CONSULTATION_BY_ID, 
  VISIT_MANY_FILTER, 
  LAB_RESULT_FILTER,
  VACCINATION_MANY_FILTER,
  MEDICATIONS_MANY_FILTER,
  PRESCRIPTION_MANY_FILTER
} from "../../graphql/queries";

import { REMOVE_VISITE, UPDATE_CONSULTATION_STATUS } from "../../graphql/mutations";


// Imports for tabs
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, FormControl, Input, InputLabel, LinearProgress, MenuItem, Select } from "@mui/material";

import AddVisit from "../crudpages/addvisit";
import AddLabResult from "../crudpages/addlabresult";
import AddVaccination from "../crudpages/addvaccination";
import AddPrescription from "../crudpages/addprescription";
import DeleteButton from "../../components/DeleteButton";
import AddFeedback from "../crudpages/addFeedback";
import AddMedication from "../crudpages/addmedication";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Consultation = () => {

    const { id } = useParams();

    let navigate = useNavigate()

    const [value, setValue] = React.useState(0);

    const [status, setStatus] = React.useState('');

    const [ConsultationUpdateById] = useMutation(UPDATE_CONSULTATION_STATUS)

    const [visitRemoveById] = useMutation(REMOVE_VISITE)


    const { loading, data, error } = useQuery(CONSULTATION_BY_ID, {
      variables: {id}
    });

    const { loading : loadingvisit, data : datavisite , error : errorvisit } = useQuery(VISIT_MANY_FILTER, {
      variables: {
        filter:{
          consultation : id
        }
      }
    });

    const { loading : loadingmedication, data : datamedication , error : errormedication } = useQuery(MEDICATIONS_MANY_FILTER, {
      variables: {
        filter:{
          consultation : id
        }
      }
    });

    const { loading : loadingprescription, data : dataprescription , error : errorprescription } = useQuery(PRESCRIPTION_MANY_FILTER, {
      variables: {
        filter:{
          consultation : id
        }
      }
    });

    const { loading : loadingvaccination, data : datavaccination , error : errorvaccination } = useQuery(VACCINATION_MANY_FILTER, {
      variables: {
        filter:{
          consultation : id
        }
      }
    });

    const { loading : loadinglab, data : datalab , error : errorlab } = useQuery(LAB_RESULT_FILTER, {
      variables: {
        filter:{
          consultation : id
        }
      }
    });

    const theme = useTheme();
    
    const isNonMobile = useMediaQuery("(min-width:600px)")

    const handlChange = async (event) => {
      setStatus(event.target.value);
      let test = event.target.value
      

      try {
        const { data } = await ConsultationUpdateById({  
            variables: {
            id: id,
            record: {
              status: test
            }
          }} 
        )
        // navigate("/consultations")
        window.location.reload();
        console.log("Status ",event.target.value)
      }catch(err) {
        console.log("Error went updating ", err)
      }

    };

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };



    if(error | errorvisit | errorlab | errormedication | errorprescription | errorvaccination ){
      return <p className="text-red-500">Server error </p>
    }

    console.log("data test ", datavisite)
    console.log("data lab ", datalab)

    const colors = tokens(theme.palette.mode);
  
    if(loading | loadingvisit | loadinglab | loadingvaccination | loadingmedication | loadingprescription){
      return (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      );
      }

      console.log("Consultation data ", data.consultationById.doctor_feedback)
      let Data =  data.consultationById

      // console.log("Data visit ", datavisite.visitMany)
      console.log("data mechant test consultation", data)
      console.log("Prescription data ", dataprescription)
      console.log("Medication data ", datamedication)

      const delte = async (id) => {  
    
        try {
          const response = await visitRemoveById({
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

      console.log("test", data.consultationById.photo_material[0])
      // data.consultationById.call_center_feedback

      const Feedback = data.consultationById.call_center_feedback.map((item) => ({
        comment : item.comment,
        user : item.user._id

      }))

      console.log("Mechant test ", Feedback)

    return (


        <div className="flex flex-col justify-center w-[50sw] p-[5%] sm:p-[10%]">
            
            <Header title="Consultation detail"/>

            <div className="flex flex-row-reverse gap-4">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Age"
                        onChange={handlChange}
                      >
                        <MenuItem value="New">New</MenuItem>
                        <MenuItem value="In_Review">In Review</MenuItem>
                        <MenuItem value="Closed">Closed</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
            
            <Box sx={{ width: '100%', typography: 'body1' }}>

              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Patient informations" {...a11yProps(0)} sx={{ fontSize : "16px", color:"black" }}/>
                    <Tab label="Medical history" {...a11yProps(1)} sx={{ fontSize : "16px", color:"black" }}/>
                    <Tab label="Lab result" {...a11yProps(2)} sx={{ fontSize : "16px", color:"black" }}/>
                    <Tab label="Prescription" {...a11yProps(3)} sx={{ fontSize : "16px", color:"black" }}/>
                    <Tab label="Vaccinations" {...a11yProps(4)} sx={{ fontSize : "16px", color:"black" }}/>
                    <Tab label="Visits" {...a11yProps(5)} sx={{ fontSize : "16px", color:"black" }}/>
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <div className="flex justify-between">
                    <div className="text-lg">                  
                      <p><span className="font-semibold me-4">Name :</span> {Data.patient.name} </p>
                      <p><span className="font-semibold me-4">Age :</span> {Data.patient.age}</p>
                      <p><span className="font-semibold me-4">Phone :</span> {Data.patient.phone}</p>
                      <p><span className="font-semibold me-4">Created at :</span> {new Date(Data.patient.createdAt).toISOString().split("T")[0]}</p>
                      <p><span className="font-semibold me-4">Complain:</span> {Data.complain}</p>
                      <p><span className="font-semibold me-4">Pulse:</span> {Data.pulse}</p>
                      <p><span className="font-semibold me-4">Temperature:</span> {Data.temperature}</p>
                      <p><span className="font-semibold me-4">Blood pressure:</span> {Data.blood_pressure}</p>
                      <p><span className="font-semibold me-4">Emergency:</span> {Data.emergency?"True":"False"}</p>
                      <p><span className="font-semibold me-4">Consultation statu:</span> {Data.status}</p>
                      <p><span className="font-semibold me-4">Updated at:</span> {new Date(Data.updatedAt).toISOString().split("T")[0]}</p>
                  
                    </div>
                    <div>
                      <img src={data.consultationById.photo_material[0]} alt="" className="w-[20rem]"/>
                    </div>
                  </div>
                  <div className="w-full">
                    <h1 className="text-3xl font-700 mt-10 mb-6">FeedBacks</h1>
                    {/* <button></button> */}
                    <form action="" className="flex flex-col gap-2">
                      {/* <textarea name="" id="" cols="30" rows="6" placeholder="comment..." className="border border-black"/> */}
                      <AddFeedback id={data.consultationById.patient._id} dataFeedBack={Feedback}/>
                      {/* <Button variant="contained" sx={{ display: "inline-block", width: "300px"}} >Add feedBack </Button> */}
                    </form>

                    <div className="mt-4 flex flex-col gap-2">
                      
                      <h1 className="text-xl font-semibold ">Call center feedback </h1>

                      {data.consultationById.call_center_feedback?.map((item) => (
                        <div className="text-lg bg-blue-50 w-full p-2 ">
                           <span className="text-xl font-bold">{item.user.first_name}</span><br />
                           {item.comment}
                        </div>
                      ))}

                      <h1 className="text-xl font-semibold " >Doctor feedback </h1>

                      {data.consultationById.doctor_feedback?.map((item) => (
                        <div className="text-lg bg-red-50 w-full p-2 ">
                           <span className="text-xl font-bold">{item.user.first_name}</span><br />
                           {item.comment}
                        </div>
                      ))}
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                <div className="flex flex-row-reverse gap-4">
                  <Box>
                        <AddMedication id={data.consultationById.patient._id}/>
                      </Box>
                    </div>
                    {datamedication.medicationMany.map((medication) => (
                    <div className="flex flex-col gap-4 w-full px-[3%] py-[2%] bg-blue-100 my-2">  
                  <div className="flex  gap-4">
                      {/* <Box>
                        <DeleteButton onDelete={() => delte(lab._id)}/>
                      </Box> */}
                    </div>   
                      <p><span className="font-semibold me-4">Name :</span> {medication.name} </p>
                      <p><span className="font-semibold me-4">Description :</span> {medication.description} </p>
                      <p><span className="font-semibold me-4">Dosage :</span> {medication.dosage} </p>
                      <p><span className="font-semibold me-4">Manufacturer :</span> {medication.manufacturer} </p>
                      <p><span className="font-semibold me-4">Start date :</span> { new Date(medication.start_date).toISOString().split("T")[0]}</p>
                      <p><span className="font-semibold me-4">End date :</span> { new Date(medication.end_date).toISOString().split("T")[0]}</p>
                      <p><span className="font-semibold me-4">Created by :</span>{medication.createdByDetails.last_name} {medication.createdByDetails.first_name} </p>
                    
                    </div>
                  )) }
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <div className="flex flex-row-reverse gap-4">
                      <Box>
                        <AddLabResult id={data.consultationById.patient._id}/>
                      </Box>
                    </div>
                  {datalab.labResultMany.map((lab) => (
                    <div className="flex flex-col gap-4 w-full px-[3%] py-[2%] bg-blue-100 my-2">  
                  <div className="flex  gap-4">
                      {/* <Box>
                        <DeleteButton onDelete={() => delte(lab._id)}/>
                      </Box> */}
                    </div>   
                      <p><span className="font-semibold me-4">Type :</span> {lab.type} </p>
                      <p><span className="font-semibold me-4">Result :</span> {lab.result} </p>
                      <p><span className="font-semibold me-4">Created at :</span> { new Date(lab.createdAt).toISOString().split("T")[0]}</p>
                      <p><span className="font-semibold me-4">Created by :</span>{lab.createdByDetails.last_name} {lab.createdByDetails.first_name} </p>
                     
                    </div>
                  )) }
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <div className="flex flex-row-reverse gap-4">
                      <Box>
                        <AddPrescription id={data.consultationById.patient._id}/>
                      </Box>
                    </div>
                    {dataprescription.prescriptionMany.map((prescription) => (
                    <div className="flex flex-col gap-4 w-full px-[3%] py-[2%] bg-blue-100 my-2">  
                  <div className="flex  gap-4">
              
                    </div>   
                      <p><span className="font-semibold me-4">Contraindications :</span> {prescription.contraindications} </p>
                      <p><span className="font-semibold me-4">Dosage :</span> {prescription.contraindications} </p>
                      <p><span className="font-semibold me-4">Start date :</span> { new Date(prescription.start_date).toISOString().split("T")[0]}</p>
                      <p><span className="font-semibold me-4">End date :</span> { new Date(prescription.end_date).toISOString().split("T")[0]}</p>
                      <p><span className="font-semibold me-4">Created by :</span>{prescription.createdByDetails.last_name} {prescription.createdByDetails.first_name} </p>

                    </div>
                  )) }
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    <div className="flex flex-row-reverse gap-4">
                      <Box>
                        <AddVaccination id={data.consultationById.patient._id}/>
                      </Box>
                    </div>
                  
                    {datavaccination.vaccinationMany.map((vaccination) => (
                    <div className="flex flex-col gap-4 w-full px-[3%] py-[2%] bg-blue-100 my-2">  
                  <div className="flex  gap-4">
                    </div>   
                      <p><span className="font-semibold me-4">Vaccine :</span> {vaccination.vaccine} </p>
                      <p><span className="font-semibold me-4">Created at :</span> { new Date(vaccination.createdAt).toISOString().split("T")[0]}</p>
                      <p><span className="font-semibold me-4">Created by :</span>{vaccination.createdByDetails.last_name} {vaccination.createdByDetails.first_name} </p>
                     
                    </div>
                  )) }
                </CustomTabPanel>

                <CustomTabPanel value={value} index={5}>
                  <div className="flex flex-row-reverse gap-4">
                      <Box>
                      <AddVisit id={data.consultationById.patient._id}/>
                        </Box>
                    </div>



                    {datavisite.visitMany.map((visit) => (
                    <div className="flex flex-col gap-4 w-full px-[3%] py-[2%] bg-blue-100 my-2">  
                  <div className="flex  gap-4">
                      {/* <Box>
                        
                        <DeleteButton onDelete={() => delte(visit._id)}/>
                      </Box> */}
                    </div>   
                      <p><span className="font-semibold me-4">Note :</span> {visit.notes} </p>
                      <p><span className="font-semibold me-4">Symptoms :</span> {visit.symptoms}</p>
                      <p><span className="font-semibold me-4">Treatment :</span> {visit.treatment}</p>
                      <p><span className="font-semibold me-4">Created at :</span> {  new Date(visit.createdAt).toISOString().split("T")[0]}</p>
                      <p><span className="font-semibold me-4">Created by :</span>{visit.createdByDetails.last_name} {visit.createdByDetails.first_name} </p>
                    </div>
                  )) }
                </CustomTabPanel>
              
              </Box>

            </Box>

        </div>
    )
}


export default Consultation