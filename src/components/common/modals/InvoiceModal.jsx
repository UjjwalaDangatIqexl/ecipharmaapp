import React from "react";
import { Box, Modal, Typography } from "@mui/material";

const InvoiceModal = ({ isOpen, onClose, pdfUrl }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          width: "90%",
          height: "90vh",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        {pdfUrl && (
          <object data={pdfUrl} width={"100%"} height={"100%"}>
            <Typography
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Your browser does not support PDFs. Please download the PDF to
              view it.
            </Typography>
          </object>
        )}
      </Box>
    </Modal>
  );
};

export default InvoiceModal;
