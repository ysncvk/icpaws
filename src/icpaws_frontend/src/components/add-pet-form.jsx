import * as Yup from "yup";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormProvider, { RHFTextField } from "./hook-form";
import { icpaws_backend } from "../../../declarations/icpaws_backend";
import { useSnackbar } from "notistack";

// ----------------------------------------------------------------------

export default function AddPetForm({ open, onClose, principal, mutatePets }) {
  const [imageData, setImageData] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required(),
    species: Yup.string().required(),
    breed: Yup.string().required(),
    gender: Yup.string().required(),
    image: Yup.string().required(), // Image alanı zorunlu
  });

  const defaultValues = useMemo(
    () => ({
      name: "",
      image: "",
      species: "",
      breed: "",
      gender: "",
    }),
    [],
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Data = reader.result; // Dosya verisini base64 formatına dönüştür
      setImageData(base64Data); // State'i güncelle
      setValue("image", base64Data); // Formdaki 'image' alanının değerini güncelle
    };

    if (file) {
      reader.readAsDataURL(file); // Dosyayı base64 formatına dönüştürmek için okuma işlemini başlat
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = { ...data, image: imageData, owner: principal };
      await icpaws_backend.createPet(formData);
      mutatePets();
      enqueueSnackbar("Your Pet is added to our database successufully!");
      onClose();
      console.info("DATA", data);
      reset();
      setImageData("");
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 750 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Add New Pet!</DialogTitle>

        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            pt={1}
            pb={3}
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
          >
            <RHFTextField name="name" label="Pet Name" required />
            <RHFTextField name="species" label="species" required />
            <RHFTextField name="breed" label="breed" required />
            <RHFTextField name="gender" label="gender" required />
          </Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <label htmlFor="file-upload" className="custom-file-upload">
              {imageData ? "Change Image" : "Upload Image"}
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />{" "}
            {imageData && (
              <img src={imageData} alt="your pet" height={200} width={400} />
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Add Pet
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
