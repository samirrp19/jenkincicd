import ReactPlayer from "react-player";
import { Box } from "@mui/material";

const PostMediaGrid = ({ screenshots = [], recordings = [] }) => {
  const media = [
    ...screenshots.map((s) => ({ url: s, type: "image" })),
    ...recordings.map((r) => ({ url: r, type: "video" })),
  ];

  if (media.length === 0) return null;

  const total = media.length;
  const extraCount = total - 4;
  const visibleMedia = total <= 4 ? media : media.slice(0, 4);

  const getGridStyle = () => {
    if (total === 1) return { gridTemplateColumns: "1fr" };
    if (total === 2) return { gridTemplateColumns: "1fr 1fr" };
    if (total === 3)
      return {
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr auto",
        gridTemplateAreas: `"a b" "c c"`,
      };
    return { gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" };
  };

  return (
    <Box sx={{ display: "grid", gap: 1, mt: 2, borderRadius: 2, overflow: "hidden", ...getGridStyle() }}>
      {visibleMedia.map((item, index) => {
        const isVideo = item.url?.endsWith(".mp4") || item.url?.endsWith(".webm");
        const isLast = index === 3 && total > 4;

        const area =
          total === 3
            ? index === 0
              ? "a"
              : index === 1
              ? "b"
              : "c"
            : undefined;

        return (
          <Box
            key={index}
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 3",
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid #ddd",
              backgroundColor: "#f9f9f9",
              gridArea: area,
            }}
          >
            {isVideo ? (
              <ReactPlayer
                url={item.url}
                controls
                width="100%"
                height="100%"
                style={{ position: "absolute", top: 0, left: 0 }}
              />
            ) : (
              <img
                src={item.url}
                alt={`media-${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            )}
            {isLast && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  fontWeight: 600,
                }}
              >
                +{extraCount}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default PostMediaGrid;
