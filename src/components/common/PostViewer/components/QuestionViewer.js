import React from 'react';

const QuestionViewer = ({ challengeId }) => {
  return (
    <div>
      <h2>Challenge Viewer</h2>
      <p>Display content related to challenge ID: {challengeId}</p>
      {/* Add question and answer content */}
    </div>
  );
};

export default QuestionViewer;
