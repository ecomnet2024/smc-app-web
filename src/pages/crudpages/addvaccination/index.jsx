import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

import { CREATE_VACCINATION_ONE } from "../../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useUser } from "../../../context/authContext";
import { useParams } from "react-router-dom";


const AddVaccination = ( { id } ) => {
  const [open, setOpen] = useState(false);

  const [vaccinationCreateOne, { loading : loadingvaccination, error : errorvaccination , data : datavaccination } ] = useMutation(CREATE_VACCINATION_ONE);

  const {user} = useUser();
  const { id : consultationId } = useParams()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Récupérez les données du formulaire ici
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const data2 = { ...data, patient: id }
    const data3 = { ...data2, medical_staff: user.user_id}
    const data4 = { ...data3, consultation : consultationId}
    const data5 = { ...data4, createdBy : user.user_id}

  

    const { datalab } = await vaccinationCreateOne({
        variables: {
            record: data5
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
        Add Vaccination
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
            Add Vaccination
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="vaccine"
              label="Vaccine"
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

export default AddVaccination;