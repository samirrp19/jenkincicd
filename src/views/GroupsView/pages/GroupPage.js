import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GroupSidebar from '../components/GroupSidebar';
import GroupForm from '../components/GroupForm';
import GroupDetails from '../components/GroupDetails';

const GroupPage = () => {
  return (
    <div className="d-flex">
      <GroupSidebar />
      <div className="content-area">
        <Routes>
          <Route path="/groups/create" component={GroupForm} />
          <Route path="/groups/:groupId" component={GroupDetails} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  );
};

export default GroupPage;
