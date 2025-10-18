import React, { useEffect, useState } from "react";
import { Box, Link, Typography, Button } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

function PhotoDetails() {
  const [photoDetails, setPhotoDetails] = useState({
    author: "",
    width: 0,
    height: 0,
    url: "",
    download_url: "",
  });

  const { id } = useParams();

  // Fetch data from photos details API and replace URLs with picsum.photos
  useEffect(() => {
    const getPhotoDetails = () => {
      fetch(`https://picsum.photos/seed/${id}/info`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setPhotoDetails(data);
          console.log(data);
        })
        .catch((error) => console.error("Error fetching photos:", error));
    };

    getPhotoDetails();
  }, []);

  return (
    <Box>
      {/* Photo details header, back to list button and image display */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#fafafa",
          py: 8,
        }}
      >
        {/* Photo details header */}
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "text.primary",
            marginBottom: 4,
          }}
        >
          📸 Photo Details
        </Typography>

        {/* Back to list button */}
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          startIcon={<ArrowBackRoundedIcon />}
          sx={{
            mb: 4,
            backgroundColor: "black",
            borderRadius: 2,
            overflow: "hidden",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 4,
            },
          }}
        >
          Back to list
        </Button>
        {/* Opens the original image in a new tab to download it */}
        <Link href={photoDetails.download_url} underline="none" target="_blank">
          <img
            src={`https://picsum.photos/seed/${id}/${photoDetails.width}/${photoDetails.height}`}
            alt={`Photo by ${photoDetails.author}`}
            loading="lazy"
            style={{
              width: "90%",
              maxWidth: 1000,
              height: "auto",
              display: "block",
              margin: "0 auto",
              borderRadius: 8,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Link>
      </Box>

      {/* Details section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "left",
          }}
        >
          {/* Author name rendering */}
          <Typography variant="h5">
            <strong>Author:</strong> {photoDetails.author || "Unknown"}
          </Typography>
          {/* Photo resolution rendering */}
          <Typography variant="h6">
            <strong>Resolution:</strong> {photoDetails.width} x{" "}
            {photoDetails.height}
          </Typography>
          <Typography variant="h6">
            <strong>Source:</strong>{" "}
            <Link
              href={photoDetails.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Picsum
            </Link>
          </Typography>
          {/* Download button with link rendering */}
          <Typography variant="h6">
            <strong>Download:</strong>{" "}
            <Link
              href={photoDetails.download_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Full Image
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
export default PhotoDetails;
