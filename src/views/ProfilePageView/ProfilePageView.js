import React, { useState, useEffect } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import Header from "../CommunityView/components/Header";
import ProfileCard from "./components/ProfileCard";
import ProfileTabs from "./components/ProfileTabs";
import FriendsList from "./components/FriendsList";
import ProjectsGallery from "./components/ProjectsGallery";
import ProfileInfo from "./components/ProfileInfo";
import ProfilePosts from "./components/ProfilePosts";
import SkillsCard from "./components/SkillsCard";
import MembersToConnectCard from "./components/MembersToConnectCard";
import ProfileSidebarStats from "./components/ProfileSidebarStats";
import { useParams } from "react-router-dom";
import useAuth from "hooks/useAuth";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const ProfilePageView = () => {
  const { token } = useAuth();
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (!username || !token) return;
    axios
      .get(`${apiUrl}/api/users/${username}/profile`, {
        headers: { "x-auth-token": token },
      })
      .then((res) => setProfileData(res.data.user))
      .catch(console.error);
  }, [token, username]);

  if (!profileData) {
    return (
      <Box
        sx={{
          height: "100vh",
          bgcolor: "#f3f2ef",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "#f3f2ef",
        minHeight: "100vh",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
          mx: { xs: 2, md: 6 },
          mt: 2,
          px: 2,
          py: 1,
          flexShrink: 0,
        }}
      >
        <Header toggleSidebar={() => setMobileSidebarOpen(true)} />
      </Box>

      {/* Main Layout */}
      <Box
        sx={{
          flexGrow: 1,
          mx: { xs: 2, md: 20 },
          overflowY: { xs: "auto", md: "hidden" }, // 🛠️ Key: allow scroll for mobile
          height: { xs: "auto", md: "calc(100vh - 130px)" }, // Desktop fixed height, Mobile auto
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            flexWrap: { xs: "wrap", md: "nowrap" },
            height: "100%",
          }}
        >
          {/* Left Section */}
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              height: { md: "100%" },
              overflowY: { xs: "visible", md: "auto" }, // Desktop scrollable, mobile normal
              pr: { md: 2 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
              <ProfileCard
                profilePicture={profileData.profilePicture}
                name={profileData.name}
                email={profileData.email}
              />
              <ProfileTabs value={tabValue} handleChange={handleTabChange} />
              <Box sx={{ mt: 2 }}>
                {tabValue === 0 && <ProfileInfo about={profileData.about || "No information provided."} />}
                {tabValue === 1 && <ProfilePosts posts={profileData.posts || []} />}
                {tabValue === 2 && <FriendsList friends={profileData.friends || []} />}
                {tabValue === 3 && <ProjectsGallery projects={profileData.projects || []} />}
              </Box>
            </Box>
          </Grid>

          {/* Right Sidebar */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              height: { md: "100%" },
              overflowY: { xs: "visible", md: "auto" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
              <ProfileSidebarStats />
              <SkillsCard skills={profileData.skills || []} />
              <MembersToConnectCard />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfilePageView;
