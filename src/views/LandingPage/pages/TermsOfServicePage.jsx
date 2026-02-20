// src/pages/TermsOfServicePage.jsx
import React from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import HeaderLanding from "../components/HeaderLanding"; // ✅ include header
import termsOfService from "../data/termsOfService.json"; // adjust path if needed

const TermsOfServicePage = () => (
  <>
    <HeaderLanding />

    <Box sx={{ pt: { xs: "80px", md: "90px" }, pb: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          {termsOfService.title}
        </Typography>

        <Typography variant="body1" paragraph>
          {termsOfService.description}
        </Typography>

        {termsOfService.sections.map((section, idx) => (
          <Box key={idx} mb={4}>
            <Typography variant="h5" gutterBottom>
              {section.heading}
            </Typography>

            {section.content && (
              <Typography variant="body1" paragraph>
                {section.content}
              </Typography>
            )}

            {section.items && (
              <List>
                {section.items.map((item, i) => (
                  <ListItem key={i} disablePadding>
                    <ListItemText primary={`• ${item}`} />
                  </ListItem>
                ))}
              </List>
            )}

            {section.subsections &&
              section.subsections.map((sub, j) => (
                <Box key={j} pl={2} mt={2}>
                  <Typography variant="h6" gutterBottom>
                    {sub.heading}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {sub.content}
                  </Typography>
                </Box>
              ))}
          </Box>
        ))}
      </Container>
    </Box>
  </>
);

export default TermsOfServicePage;
