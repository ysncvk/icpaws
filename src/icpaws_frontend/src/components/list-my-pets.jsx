import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { icpaws_backend } from "../../../declarations/icpaws_backend";
import { Typography } from "@mui/material";
import MyPetItem from "./my-pet-item.jsx";

// ----------------------------------------------------------------------

export default function ListMyPets({ open, onClose, principal }) {
  const [mypets, setMyPets] = useState([]);

  useEffect(() => {
    fetchPets();
  }, [open]); // Fetch pets on component mount

  const fetchPets = async () => {
    try {
      const mypets = await icpaws_backend.getUserPets(principal);
      setMyPets(mypets);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };
  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 950 },
      }}
    >
      <DialogTitle>My Sweet Pets!</DialogTitle>

      <DialogContent>
        <>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
          >
            {mypets.map((pet) => (
              <MyPetItem key={pet.id} pet={pet} />
            ))}
          </Box>
          {!mypets.length && (
            <Typography variant="h4" padding={5}>
              "Right now, you dont have any pet:)"
            </Typography>
          )}
        </>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Ok I've seen my sweeties :)
        </Button>
      </DialogActions>
    </Dialog>
  );
}
