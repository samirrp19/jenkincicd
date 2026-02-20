import React, { useState } from "react";
import { Box, TextField, List, ListItem, ListItemText, Typography } from "@mui/material";

const SearchPanel = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setQuery(searchText);

    // Simulated search results (Replace with actual search API)
    const mockResults = ["index.js", "App.js", "styles.css"].filter((file) =>
      file.toLowerCase().includes(searchText)
    );
    setResults(mockResults);
  };

  return (
    <Box sx={styles.panel}>
      <Box sx={styles.header}>
        <Typography variant="h6" sx={styles.title}>
          Search Files
        </Typography>
        <TextField
          placeholder="Search files..."
          variant="outlined"
          size="small"
          fullWidth
          value={query}
          onChange={handleSearch}
          sx={styles.searchField}
        />
      </Box>
      <List sx={styles.list}>
        {results.length > 0 ? (
          results.map((result, index) => (
            <ListItem key={index} button sx={styles.listItem}>
              <ListItemText primary={result} />
            </ListItem>
          ))
        ) : (
          <Typography sx={styles.noResults}>No results found</Typography>
        )}
      </List>
    </Box>
  );
};

const styles = {
  panel: {
    backgroundColor: "#2c2f33", // Dark metallic background
    color: "#fff",
    height: "100%",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#3a3d41", // Metallic gray for the header
    padding: "10px 15px",
    borderBottom: "1px solid #444", // Subtle metallic divider
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  title: {
    color: "#dcdfe4", // Slightly metallic text color
    fontWeight: "bold",
    marginBottom: "5px",
  },
  searchField: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#4a4d52",
      color: "#fff",
      "& fieldset": {
        borderColor: "#5a5d62",
      },
      "&:hover fieldset": {
        borderColor: "#6a6d72",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#7a7d82",
      },
    },
  },
  list: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    backgroundColor: "#2c2f33", // Matches the main panel background
  },
  listItem: {
    backgroundColor: "#3a3d41",
    margin: "5px 0",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#4a4d52",
    },
  },
  noResults: {
    color: "#aaa",
    textAlign: "center",
    marginTop: "10px",
  },
};

export default SearchPanel;
