import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import MediaGrid from "./MediaGrid";
import axios from "axios";

const MediaFolderTabs = ({ userId, projectId, templateId, selectedMedia, setSelectedMedia }) => {
  const [tab, setTab] = useState("screenshots");
  const [media, setMedia] = useState({ screenshots: [], recordings: [] });

  useEffect(() => {
    const fetchMedia = async () => {
      if (!userId || !projectId || !templateId) return;

      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/recordings/user/${userId}`,
          { params: { projectId, templateId } }
        );

        const items = data?.recordings || [];

        const normalizeItem = (item) => ({
          ...item,
          url: item.s3Url || item.previewUrl || "", // fallback for display
          type: item.type || inferType(item.s3Url || item.previewUrl || ""), // fallback type inference
        });

        const screenshots = items.filter(i => (i.type === "screenshot")).map(normalizeItem);
        const recordings = items.filter(i => (i.type === "video")).map(normalizeItem);

        setMedia({ screenshots, recordings });
      } catch (error) {
        console.error("❌ Error fetching media files:", error);
        setMedia({ screenshots: [], recordings: [] }); // fallback
      }
    };

    fetchMedia();
  }, [userId, projectId, templateId]);

  const inferType = (url = "") => {
    if (url.endsWith(".webm") || url.endsWith(".mp4")) return "video";
    if (url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".jpeg")) return "screenshot";
    return "unknown";
  };

  const handleSelect = (items) => {
    const withUrls = items.map((item) => ({
      ...item,
      url: item.url || item.s3Url || item.previewUrl,
    }));
    setSelectedMedia((prev) => ({ ...prev, [tab]: withUrls }));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Tabs value={tab} onChange={(e, val) => setTab(val)} centered>
        <Tab label="Screenshots" value="screenshots" />
        <Tab label="Recordings" value="recordings" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        <MediaGrid
          items={media[tab]}
          selected={selectedMedia[tab]}
          onSelect={handleSelect}
        />
        {media[tab]?.length === 0 && (
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              mt: 2,
              color: "text.secondary",
            }}
          >
            No {tab === "recordings" ? "recordings" : "screenshots"} found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default MediaFolderTabs;
