import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import React from "react";
import { useBoolean } from "./hooks/use-boolean.js";
import { ConfirmDialog } from "./custom-dialog/index.js";
import { icpaws_backend } from "declarations/icpaws_backend/index.js";
import { useSnackbar } from "./snackbar/index.js";
import EditPetForm from "./edit-pet-form.jsx";

// ----------------------------------------------------------------------

export default function MyPetItem({
  pet,
  listUpdate,
  principal,
  mutateHomepets,
}) {
  const { id, name, species, breed, image, gender } = pet;

  const { enqueueSnackbar } = useSnackbar();

  const quickEdit = useBoolean();

  const confirm = useBoolean();

  const onDeleteRow = async () => {
    const response = await icpaws_backend.delete(id);
    console.log(response);
    enqueueSnackbar("Your Pet is deleted from our database succesfully!");
    confirm.onFalse();
    listUpdate();
    mutateHomepets();
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
          <Button variant="contained" color="error" onClick={confirm.onTrue}>
            delete
          </Button>{" "}
          <Button variant="outlined" onClick={quickEdit.onTrue}>
            edit
          </Button>
        </Stack>
        <ConfirmDialog
          open={confirm.value}
          onClose={confirm.onFalse}
          title="Delete"
          content="Are you sure want to delete your pet?"
          action={
            <Button variant="contained" color="error" onClick={onDeleteRow}>
              Delete
            </Button>
          }
        />
        <EditPetForm
          open={quickEdit.value}
          onClose={quickEdit.onFalse}
          id={id}
          mutatePets={listUpdate}
          currentPet={pet}
          principle={principal}
          mutateHomePets={mutateHomepets}
        />
      </Card>
    </>
  );
}
