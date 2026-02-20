import { Box, Typography } from "@mui/material";

const InfoSection = () => {
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#f8f9fc",
        borderBottom: "1px solid #ddd",
        position: "sticky",
        top: 0,
        zIndex: 100,
        textAlign: "center",
      }}
    >
      {/* Main Title */}
      <Typography variant="p" fontWeight="bold">
      Let's dive into AI ! Start by following these steps :
      </Typography>

      {/* Steps Container */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          gap: 3,
        }}
      >
        {/* Step 1 */}
        <Box
          sx={{
            p: 2,
            px: 4,
            borderRadius: "10px",
            bgcolor: "#eef2ff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              bgcolor: "#6366f1",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            1
          </Typography>
          <Typography variant="body2">
            Begin by selecting a template to create your workspace.
          </Typography>
        </Box>

        {/* Step 2 */}
        <Box
          sx={{
            p: 2,
            px: 4,
            borderRadius: "10px",
            bgcolor: "#eef2ff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              bgcolor: "#6366f1",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            2
          </Typography>
          <Typography variant="body2">
            Provide the necessary context to set up the AI workspace.
          </Typography>
        </Box>

        {/* Step 3 */}
        <Box
          sx={{
            p: 2,
            px: 4,
            borderRadius: "10px",
            bgcolor: "#eef2ff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              bgcolor: "#6366f1",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            3
          </Typography>
          <Typography variant="body2">
            Generate the required AI output tailored to your workspace context.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoSection;
