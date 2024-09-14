import { Box, Modal } from "@mui/material";
import React from "react";
import AddressForm from "../../ui/forms/addressForm/AddressForm";
import { useSelector } from "react-redux";
import Loader from "../Loader";

const AddressFormModal = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          width: "60%",
          maxWidth: "90vw",
          maxHeight: "90vh",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          overflow: "auto",
          borderRadius: 2,
        }}
      >
        <AddressForm onClose={onClose} />
      </Box>
    </Modal>
  );
};

export default AddressFormModal;
