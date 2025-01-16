import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, Button, CircularProgress } from "@mui/material";

import {  UPDATE_CONSULTATION_FEEDBACK } from "../../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useUser } from "../../../context/authContext";


const AddFeedback = ( { id, dataFeedBack } ) => {

  // const updatedData1 = dataFeedBack.map(({ __typename, ...rest }) => rest);
  // const updatedData = updatedData1.map(({ user, ...rest }) => rest);

  // console.log(updatedData);
  
  const [open, setOpen] = useState(false);
  const { id : idConsultation } = useParams();

  const [tableData, setTableData] = useState(dataFeedBack);



  console.log("dataFeedBack", dataFeedBack)

  const {user} = useUser();


  const [ ConsultationUpdateById, { loading : loadingConsultation, error : errorConsultation , data : dataConsultation } ] = useMutation(UPDATE_CONSULTATION_FEEDBACK);

  if(errorConsultation){
    return <p>Server error </p>
  }

  if(loadingConsultation){
    return (
      <Box sx={{ width: '100%', height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <CircularProgress color="secondary" size="3rem"/>
      </Box>
    );
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);


    setTableData((prevData) => [ ...prevData, { comment : data.comment}])

    console.log("Data truc ", tableData)

    try {
      const { dataConsultation } = await ConsultationUpdateById({  
          variables: {
          id: idConsultation,
          record: {
            call_center_feedback : [ ...tableData, { comment : data.comment, user: user.user_id}]
          }
        }} )

        console.log("Ekier ca marche ", dataConsultation)

        handleClose();
        window.location.reload();
      }catch(err) {
        console.log("Error went updating ", err)
      }

      window.location.reload();

};

  return (
    <div>

      {/* Bouton pour ouvrir la modal */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Feedback
      </Button>

      {/* Modal avec le formulaire */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Add Feedback
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="comment"
              label="Feedback"
              variant="outlined"
              rows="3"
              margin="normal"
              required
            />
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleClose}
                color="secondary"
                variant="outlined"
                sx={{ mr: 1 }}
              >
                Annuler
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Add
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddFeedback;
