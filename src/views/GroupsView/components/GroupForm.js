import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroupForm = ({ history }) => {
  const [name, setName] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [members, setMembers] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Fetch friends list
    const fetchFriends = async () => {
      try {
        const response = await axios.get('/api/users/friends', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  const handleCreateGroup = async () => {
    try {
      const response = await axios.post('/api/groups/create', {
        name,
        privacy,
        members
      }, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      history.push(`/groups/${response.data._id}`);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div>
      <h2>Create Group</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Group Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="privacy">Privacy</label>
          <select className="form-control" id="privacy" value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="members">Invite Friends</label>
          <select multiple className="form-control" id="members" value={members} onChange={(e) => setMembers([...e.target.selectedOptions].map(o => o.value))}>
            {friends.map(friend => (
              <option key={friend._id} value={friend._id}>{friend.username}</option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleCreateGroup}>Create Group</button>
      </form>
    </div>
  );
};

export default GroupForm;
