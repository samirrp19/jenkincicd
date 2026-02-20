import React from "react";
import { Box, Typography } from "@mui/material";

const SubscriptionsPage = () => {
  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Typography variant="h5" fontWeight="bold">Subscriptions</Typography>
      <Typography sx={{ mt: 3, textAlign: "center" }}>No active subscriptions</Typography>
    </Box>
  );
};

export default SubscriptionsPage;
