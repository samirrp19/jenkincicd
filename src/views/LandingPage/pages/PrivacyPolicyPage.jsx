// src/pages/PrivacyPolicyPage.jsx
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
import privacyPolicy from "../data/privacyPolicy.json"; // adjust path if needed

const PrivacyPolicyPage = () => (
  <>
    <HeaderLanding />

    <Box sx={{ pt: { xs: "80px", md: "90px" }, pb: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          {privacyPolicy.title}
        </Typography> 

        <Typography variant="body1" paragraph>
          {privacyPolicy.description}
        </Typography>

        {privacyPolicy.sections.map((section, idx) => (
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
                  {sub.items && (
                    <List>
                      {sub.items.map((item, k) => (
                        <ListItem key={k} disablePadding>
                          <ListItemText primary={`• ${item}`} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>
              ))}
          </Box>
        ))}
      </Container>
    </Box>
  </>
);

export default PrivacyPolicyPage;
