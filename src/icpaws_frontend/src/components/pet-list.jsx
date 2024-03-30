import Box from "@mui/material/Box";

import PetItem from "./pet-item";
import { useEffect, useState } from "react";
import { icpaws_backend } from "declarations/icpaws_backend/index.js";

// ----------------------------------------------------------------------

export default function PetList({pets}) {

  return (
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
        {pets.map((pet) => (
          <PetItem key={pet.id} pet={pet} />
        ))}
      </Box>
    </>
  );
}
