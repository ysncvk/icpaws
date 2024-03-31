import CreatePetForm from "./createPet";
import PetList from "./components/pet-list";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import React from "react";
import { useAuth, AuthProvider } from "./use-auth-client";
import { HttpAgent } from "@dfinity/agent";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { icpaws_backend } from "../../declarations/icpaws_backend";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { SnackbarProvider } from "./components/snackbar";

function App() {
  const { isAuthenticated, principal } = useAuth();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets();
  }, []); // Fetch pets on component mount

  const fetchPets = async () => {
    try {
      const pets = await icpaws_backend.list();
      setPets(pets);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  const handlePetCreated = () => {
    fetchPets(); // Re-fetch pets after a new pet is created

    console.error("Error fetching pets after creation:");
  };

  return (
    <main>
      <Box sx={{ flexGrow: 1, pb: 5, pl: 10, pr: 10 }}>
        <Grid container columns={16} spacing={1}>
          <Grid item xs={16} md={10} padding={0}>
            <img
              src="/logo.png"
              alt="Your logo"
              height="200"
              style={{ borderRadius: "10px" }}
            />
          </Grid>
          <Grid item xs={16} md={6}>
            <Card
              sx={{
                minHeight: 200,
                maxHeight: 200,
                borderRadius: "10px",
              }}
            >
              {isAuthenticated ? (
                <LoggedIn updateList={handlePetCreated} />
              ) : (
                <LoggedOut />
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ p: 1, paddingLeft: 10, paddingRight: 10 }}>
        <PetList pets={pets} />
      </Box>
    </main>
  );
}

export default () => (
  <AuthProvider>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </AuthProvider>
);
