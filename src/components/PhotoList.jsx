import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function PhotoList() {
  const [photos, setPhotos] = useState([]);

  // Fetch data from photos API
  useEffect(() => {
    const getPhotos = () => {
      fetch("https://jsonplaceholder.typicode.com/photos")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const updatedPhotoLinks = data.map((photo) => ({
            ...photo,
            url: `https://picsum.photos/seed/${photo.id}/150/150`,
            thumbnailUrl: `https://picsum.photos/seed/${photo.id}/150/150`,
            title: `${photo.id}`,
            infoUrl: `https://picsum.photos/seed/${photo.id}/info`,
          }));
          setPhotos(updatedPhotoLinks);
          console.log(updatedPhotoLinks);
        })
        .catch((error) => console.error("Error fetching photos:", error));
    };

    getPhotos();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#fafafa",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Typography
        variant="h3"
        sx={{ mb: 2, fontWeight: "bold", color: "text.primary" }}
      >
        📸 Photo Browser
      </Typography>

      <ImageList
        sx={{
          width: "90%",
          maxWidth: 900,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 2,
          p: 1,
        }}
        cols={4}
        gap={10}
      >
        {photos.slice(0, 5000).map((photo) => (
          <ImageListItem
            key={photo.id}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 4,
              },
            }}
          >
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              loading="lazy"
              style={{ width: "100%", height: "100%" }}
            />
            <h2 style={{ textAlign: "center" }}>{photo.title}</h2>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default PhotoList;
