// src/views/components/ChallengeMainContent.js
import React, { useState } from 'react';
import { Box } from '@mui/material';
import HackathonListPage from './HackathonListPage';
import HackathonDetailsPage from './HackathonDetailsPage';
import HackathonHeader from './HackathonHeader';
import CreateHackathonPage from './CreateHackathonPage';
import PracticeView from './PracticeView';
import QuestionList from './QuestionList';
import QuestionView from 'views/QuestionView'; // ⬅️ import QuestionView

const ChallengeMainContent = ({ selectedTab }) => {
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null); // ⬅️ state to handle fullscreen question

  const handleBackToList = () => {
    setSelectedHackathon(null);
    setShowCreate(false);
  };

  return (
    <>
      {/* Fullscreen overlay for question */}
      {selectedQuestionId && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            bgcolor: '#fff',
            zIndex: 1500,
          }}
        >
          <QuestionView
            questionId={selectedQuestionId}
            onBack={() => setSelectedQuestionId(null)}
          />
        </Box>
      )}

      <Box sx={{ pt: 3 }}>
        {selectedTab === 0 && (
          <>
            <HackathonHeader onCreateHackathonClick={() => setShowCreate(true)} />
            {showCreate ? (
              <CreateHackathonPage onCreated={handleBackToList} showBackButton />
            ) : selectedHackathon ? (
              <HackathonDetailsPage hackathon={selectedHackathon} onBack={handleBackToList} />
            ) : (
              <HackathonListPage onSelectHackathon={setSelectedHackathon} />
            )}
          </>
        )}

        {selectedTab === 1 && (
          <QuestionList onSelectQuestion={(id) => setSelectedQuestionId(id)} />
        )}

        {selectedTab === 2 && <PracticeView />}
        {selectedTab === 3 && <Box>Settings Section</Box>}
      </Box>
    </>
  );
};

export default ChallengeMainContent;
