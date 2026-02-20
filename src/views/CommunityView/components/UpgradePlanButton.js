// src/views/Community/components/UpgradePlanButton.jsx

import React from "react";
import { Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";

const UpgradePlanButton = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/billing/upgrade-plan`,
        {
          userId: user._id,
          plan: "pro", // or dynamically change this based on selection
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      const { orderId, razorpayKey, amount, currency } = response.data;

      const options = {
        key: razorpayKey,
        amount,
        currency,
        name: "Codex AI",
        description: "Upgrade to Pro Plan",
        order_id: orderId,
        handler: function (paymentResponse) {
          alert("Payment successful");
          // Optionally reload to reflect subscription status
          window.location.reload();
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        notes: {
          userId: user._id,
          plan: "pro",
        },
        theme: {
          color: "#1e88e5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Upgrade failed:", error);
      alert("Failed to initiate upgrade. Please try again.");
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleUpgrade}
        sx={{
          mt: 1,
          fontWeight: "bold",
          textTransform: "none",
          borderRadius: 2,
        }}
      >
        Upgrade Plan
      </Button>
    </Box>
  );
};

export default UpgradePlanButton;
