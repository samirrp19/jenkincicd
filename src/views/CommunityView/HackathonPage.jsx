// pages/PracticePage.jsx
import React from "react";
import HackathonListPage from "../ChallengeView/components/HackathonListPage";
import CommunityLayout from "./CommunityLayout";

const PracticePage = () => {
  return (
    <CommunityLayout>
      <HackathonListPage />
    </CommunityLayout>
  );
};

export default PracticePage;
