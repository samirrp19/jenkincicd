// pages/PracticePage.jsx
import React from "react";
import QuestionList from "../ChallengeView/components/QuestionList";
import CommunityLayout from "./CommunityLayout";

const ChallengePage = () => {
  return (
    <CommunityLayout>
      <QuestionList />
    </CommunityLayout>
  );
};

export default ChallengePage;
