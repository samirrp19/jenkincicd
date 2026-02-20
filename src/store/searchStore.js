// searchStore.js
import { create } from 'zustand';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const useSearchStore = create((set) => ({
  searchResults: { users: [], posts: [] },

  searchUsersAndPosts: async (query) => {
    try {
      const response = await axios.get(`${apiUrl}/api/search?query=${query}`);
      set({ searchResults: response.data });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  },
}));

export default useSearchStore;
