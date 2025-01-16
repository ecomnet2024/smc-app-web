import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

import { CREATE_VISIT_ONE } from "../../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useUser } from "../../../context/authContext";


const AddVisit = ( { id } ) => {
  const [open, setOpen] = useState(false);
  const { id : idConsultation } = useParams();

  const {user} = useUser();

  console.log("User ", user.user_id)

  const [visitCreateOne, { loading : loadinguser, error : errorvisite , data : datavisite } ] = useMutation(CREATE_VISIT_ONE);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Récupérez les données du formulaire ici
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const data2 = { ...data, patient: id}
    const data3 = { ...data2, consultation: idConsultation}
    const data4 = { ...data3, createdBy: user.user_id}
    

    if(errorvisite){
      return <p>{errorvisite.message}</p>
    }


    const { datavisite } = await visitCreateOne({
        variables: {
            record: data4
        }
    })

    console.log("Ekier ca marche ", datavisite)
    handleClose();
    window.location.reload();
  };

  return (
    <div>
      {/* Bouton pour ouvrir la modal */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Visit
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
              name="diagnosis"
              label="Diagnosis"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="notes"
              label="Notes"
              variant="outlined"
              margin="normal"
            //   type="test"
              required
            />
            <TextField
              fullWidth
              name="symptoms"
              label="Symptoms"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="treatment"
              label="Treatment"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="visit_date"
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

export default AddVisit;
