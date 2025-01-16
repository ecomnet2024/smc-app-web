import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const DeleteButton = ({ onDelete }) => {
  const [open, setOpen] = useState(false);




  // Ouvre le popup
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Ferme le popup
  const handleClose = () => {
    setOpen(false);
  };

  // Confirme la suppression
  const handleConfirmDelete = () => {
    onDelete(); // Fonction à appeler pour effectuer la suppression
    setOpen(false); // Fermer le popup après la suppression
  };

  return (
    <div>
      {/* Bouton pour ouvrir le popup */}
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Delete
      </Button>

      {/* Popup de confirmation */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Are you sure you want to delete this item? This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* Boutons pour annuler ou confirmer */}
          <Button onClick={handleClose} color="primary">
          Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
          Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteButton;
