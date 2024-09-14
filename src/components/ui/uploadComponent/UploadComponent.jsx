import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useDropzone } from "react-dropzone";
import CustomButton from "../../common/CustomButton";

const UploadComponent = () => {
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const newFile = acceptedFiles[0];
    setFile(
      Object.assign(newFile, {
        preview: URL.createObjectURL(newFile),
      })
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept:
      "image/jpeg, image/png, image/gif, image/bmp, image/webp, application/pdf",
    maxFiles: 1,
  });

  const removeFile = () => {
    URL.revokeObjectURL(file.preview);
    setFile(null);
  };

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image/")) {
      return (
        <Box
          sx={{
            objectFit: "cover",
          }}
          component={"img"}
          src={file.preview}
          alt={file.name}
          height="100%"
          width={"100%"}
        />
      );
    }
    if (file.type === "application/pdf") {
      return (
        <embed
          src={file.preview}
          type="application/pdf"
          height="100%"
          width={"100%"}
        />
      );
    }
    return (
      <Typography
        variant="body2"
        height="90%"
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        No preview available
      </Typography>
    );
  };

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        {...getRootProps()}
        sx={{
          p: 1,
          border: "2px dashed",
          borderColor: "primary.main",
          borderRadius: 2,
          width: "100%",
          maxWidth: 180,
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="subtitle1">Click here to upload</Typography>
      </Paper>
      <Box sx={{ mt: 2, width: "100%", maxWidth: 800 }}>
        {file && (
          <Box>
            <Typography variant="h6" mb={1}>
              Preview
            </Typography>
            <Paper
              sx={{
                p: 1.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 2,
                height: 500,
              }}
            >
              {renderFilePreview(file)}
            </Paper>
            <Box display={"flex"} gap={3} justifyContent={"flex-end"} mt={2}>
              <CustomButton
                size="small"
                variant="outlined"
                color="secondary"
                onClick={removeFile}
              >
                Remove
              </CustomButton>
              <CustomButton
                size="small"
                variant="contained"
                color="primary"
                onClick={() => alert("Uploaded!")}
              >
                Upload
              </CustomButton>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UploadComponent;
