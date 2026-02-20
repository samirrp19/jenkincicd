import React, { useState } from "react";
import { AppBar, Toolbar, Typography, InputBase, Container, Grid, Card, CardMedia, CardContent, CardActions, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Search, FilterList, ShoppingCart, AccountCircle } from "@mui/icons-material";

const categories = ["Character Creator", "Hair", "Skin", "Medieval", "Base", "Scan", "Dress", "Suit", "Sports", "Beard", "Hoodie"];
const softwareItems = [
  { id: 1, name: "Top Selling Actor", price: "Weekly Deal", image: "https://via.placeholder.com/300x200" },
  { id: 2, name: "5 Stars Wanted!", price: "Earn Bonus Points", image: "https://via.placeholder.com/300x200" },
  { id: 3, name: "3D Motion Special", price: "1 for 20% Off, 2 for 35% Off", image: "https://via.placeholder.com/300x200" },
  { id: 4, name: "2D & 3D Motion Special", price: "1 for 20% Off, 2 for 35% Off", image: "https://via.placeholder.com/300x200" },
];

const MarketPlaceView = () => {
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#444" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#FFD700" }}>
            MARKETPLACE
          </Typography>
          <Button variant="contained" color="warning" sx={{ marginRight: 2 }}>
            EXPLORE
          </Button>
          <IconButton color="inherit">
            <ShoppingCart />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          {categories.map((category, index) => (
            <ListItem button key={index}>
              <ListItemText primary={category} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold", marginBottom: 3 }}>
          3D MODELS, 3D ANIMATIONS AND 2D ASSETS
        </Typography>
        <Grid container spacing={3}>
          {softwareItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card>
                <CardMedia component="img" height="200" image={item.image} alt={item.name} />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>{item.price}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default MarketPlaceView;
