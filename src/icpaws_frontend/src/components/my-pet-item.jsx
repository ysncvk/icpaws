import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import React from "react";
import { useBoolean } from "./hooks/use-boolean.js";
import { ConfirmDialog } from "./custom-dialog/index.js";
import { icpaws_backend } from "declarations/icpaws_backend/index.js";

// ----------------------------------------------------------------------

export default function MyPetItem({ pet }) {
  const { id, name, species, breed, image, gender } = pet;

  const quickEdit = useBoolean();

  const confirm = useBoolean();

  const onDeleteRow = async () => {
    const response = await icpaws_backend.delete(id);
    console.log(response);
  };

  return (
    <>
      <Card>
        <img
          src={image}
          alt="Selected image"
          style={{ maxWidth: "100%", maxHeight: "200px" }}
        />

        <Stack>
          <Stack direction="row" gap={3} alignItems="center">
            <Typography variant="subtitle1" color="text.disabled">
              {" "}
              Name of the pet:{" "}
            </Typography>
            <Typography variant="subtitle1"> {name} </Typography>
          </Stack>
          <Stack direction="row" gap={3} alignItems="center">
            <Typography variant="subtitle1" color="text.disabled">
              {" "}
              Species of the pet:{" "}
            </Typography>
            <Typography variant="subtitle1"> {species} </Typography>
          </Stack>
          <Stack direction="row" gap={3} alignItems="center">
            <Typography variant="subtitle1" color="text.disabled">
              {" "}
              Breed of the pet:{" "}
            </Typography>
            <Typography variant="subtitle1"> {breed} </Typography>
          </Stack>
          <Stack direction="row" gap={3} alignItems="center">
            <Typography variant="subtitle1" color="text.disabled">
              {" "}
              Gender of the pet:{" "}
            </Typography>
            <Typography variant="subtitle1"> {gender} </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" gap={3} p={3}>
          {" "}
          <Button variant="outlined" onClick={onDeleteRow}>
            delete
          </Button>{" "}
          <Button variant="outlined">edit</Button>
        </Stack>
      </Card>
    </>
  );
}
