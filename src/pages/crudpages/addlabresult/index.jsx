import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

import { CREATE_LAB_RESUlT_ONE } from "../../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useUser } from "../../../context/authContext";
import { useParams } from "react-router-dom";


const AddLabResult = ( { id } ) => {
  const [open, setOpen] = useState(false);
  const { id : idConsultation } = useParams();

  const [labResultCreateOne, { loading : loadinguser, error : erroruser , data : datavisite } ] = useMutation(CREATE_LAB_RESUlT_ONE);

  const {user} = useUser();
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Récupérez les données du formulaire ici
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const data1 = { ...data, consultation: idConsultation}
    const data2 = { ...data1, medical_staff: user.user_id}
    const data3 = { ...data2, patient: id}
    const data4 = { ...data3, createdBy: user.user_id}

    console.log("user truc ", user.user_id)

    const { datalab } = await labResultCreateOne({
        variables: {
          record: data4
        }
    })

    console.log("Ekier ca marche ", datalab)
    handleClose();
    window.location.reload();
  };



  return (
    <div>
      {/* Bouton pour ouvrir la modal */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Lab Result
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
            Add Visit
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="result"
              label="Result"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="type"
              label="Type"
              variant="outlined"
              margin="normal"
            //   type="test"
              required
            />

            <TextField
              fullWidth
              name="date"
              variant="outlined"
              margin="normal"
              type="date"
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

export default AddLabResult;
