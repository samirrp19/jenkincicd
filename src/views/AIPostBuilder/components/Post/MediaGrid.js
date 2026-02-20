import React from "react";
import { Grid, Checkbox, Box } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const MediaGrid = ({ items = [], selected = [], onSelect }) => {
  const isSelected = (item) => {
    const id = item._id || item.s3Url || item.url;
    return selected.some((sel) => (sel._id || sel.s3Url || sel.url) === id);
  };

  const toggleSelect = (item) => {
    const id = item._id || item.s3Url || item.url;
    const exists = selected.some((sel) => (sel._id || sel.s3Url || sel.url) === id);

    const updated = exists
      ? selected.filter((sel) => (sel._id || sel.s3Url || sel.url) !== id)
      : [...selected, item];

    onSelect(updated);
  };

  const getMediaType = (item) => {
    if (item.type) return item.type;
    const url = item.s3Url || item.url || "";
    return url.endsWith(".webm") || url.endsWith(".mp4") ? "video" : "image";
  };

  return (
    <Box sx={{ height: "calc(100vh - 280px)", overflowY: "auto", pr: 1 }}>
      <Grid container spacing={2}>
        {items.map((item, idx) => {
          const mediaUrl = item.s3Url || item.url;
          const selectedState = isSelected(item);
          const type = getMediaType(item);

          return (
            <Grid item xs={4} key={idx}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                  border: selectedState ? "2px solid #1976d2" : "2px solid #ccc",
                  cursor: "pointer",
                }}
                onClick={() => toggleSelect(item)}
              >
                {type === "video" ? (
                  <Box sx={{ position: "relative", pt: "56.25%" }}>
                    <video
                      src={mediaUrl}
                      muted
                      preload="metadata"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <PlayCircleOutlineIcon
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: 40,
                        color: "#ffffffcc",
                      }}
                    />
                  </Box>
                ) : (
                  <img
                    src={mediaUrl}
                    alt={`media-${idx}`}
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                    }}
                  />
                )}

                <Checkbox
                  checked={selectedState}
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    color: "#fff",
                    backgroundColor: "#0006",
                    borderRadius: "50%",
                    p: "4px",
                  }}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MediaGrid;
