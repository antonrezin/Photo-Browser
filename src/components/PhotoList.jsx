import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Link, useMediaQuery, useTheme, Fab } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { Link as RouterLink } from "react-router-dom";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

function PhotoList() {
  const [photos, setPhotos] = useState([]);
  const [visiblePhotos, setVisiblePhotos] = useState(60);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  // Responsive columns based on screen size (mobile, tablet and desktop)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const cols = isSmallScreen ? 1 : isMediumScreen ? 3 : isLargeScreen ? 4 : 6;

  // Fetch data from photos API and replace URLs with picsum.photos
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
            seed: photo.id,
          }));
          setPhotos(updatedPhotoLinks);
          console.log(updatedPhotoLinks);
        })
        .catch((error) => console.error("Error fetching photos:", error));
    };

    getPhotos();
  }, []);

  // Scroll listener for scroll event to show/hide scroll back to top button
  useEffect(() => {
    const checkScrollPosition = () => {
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition > 300) {
        setIsButtonVisible(true);
      } else {
        setIsButtonVisible(false);
      }
    };

    window.addEventListener("scroll", checkScrollPosition);
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const handleBackToTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Load more photos handler
  const handleLoadMorePhotos = () => {
    setVisiblePhotos((prevVisiblePhotos) => prevVisiblePhotos + 60);
  };

  return (
    // Photo list main container
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#fafafa",
        minHeight: "100vh",
        py: 10,
      }}
    >
      {/* Photo list header */}
      <Typography
        variant="h4"
        sx={{ mb: 2, fontWeight: "bold", color: "text.primary" }}
      >
        📸 Photo List
      </Typography>
      {/* Photo list grid display */}
      <ImageList
        sx={{
          width: "90%",
          maxWidth: { xs: "100%", md: 1200, lg: 1600 },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 2,
          p: 1,
        }}
        cols={cols}
        gap={8}
      >
        {/* Map through photos and display each one */}
        {photos.slice(0, visiblePhotos).map((photo) => (
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
            {/* Rendering photo thumbnail with link functionality to photo detail page */}
            <Link
              component={RouterLink}
              to={`/photos/${photo.id}`}
              underline="none"
            >
              <img
                src={`https://picsum.photos/seed/${photo.id}/1000/1000`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  aspectRatio: "1 / 1",
                }}
              />
            </Link>
          </ImageListItem>
        ))}
      </ImageList>

      {/* Load more photos button */}
      {visiblePhotos < photos.length && (
        <Button
          onClick={handleLoadMorePhotos}
          variant="text"
          startIcon={<RefreshRoundedIcon />}
          sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: 2,
            overflow: "hidden",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 4,
            },
          }}
        >
          Load More
        </Button>
      )}

      {/* Back to top floating action button (which appears after scrolling down) */}
      {isButtonVisible && (
        <Fab
          onClick={handleBackToTopClick}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            backgroundColor: "black",
            color: "white",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 4,
              backgroundColor: "black",
            },
          }}
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpRoundedIcon />
        </Fab>
      )}
    </Box>
  );
}

export default PhotoList;
