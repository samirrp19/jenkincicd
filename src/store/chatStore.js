import { create } from 'zustand';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const useChatStore = create((set) => ({
  users: [],
  messages: [],
  currentChat: null,

  fetchUsersData: async (token) => {
    try {
      const response = await axios.get(`${apiUrl}/api/users`, {
        headers: {
          'x-auth-token': token,
        },
      });
      set({ users: response.data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },

  fetchMessages: async (token) => {
    try {
      const response = await axios.get(`${apiUrl}/api/messages`, {
        headers: {
          'x-auth-token': token,
        },
      });
      set({ messages: response.data });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  },

  sendMessage: async (message, token) => {
    try {
      await axios.post(`${apiUrl}/api/messages/send`, message, {
        headers: {
          'x-auth-token': token,
        },
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  },

  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },
}));

export default useChatStore;
