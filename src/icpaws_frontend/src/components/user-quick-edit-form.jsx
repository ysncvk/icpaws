import * as Yup from "yup";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormProvider, { RHFTextField } from "./hook-form";
import { icpaws_backend } from "../../../declarations/icpaws_backend";
import { useSnackbar } from "notistack";

// ----------------------------------------------------------------------

export default function UserQuickEditForm({
  currentUser,
  open,
  onClose,
  principal,
  mutatuePanel,
}) {
  const [imageData, setImageData] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  console.log('formun içindeki vurrent yser:',currentUser)

  const NewUserSchema = Yup.object().shape({
    name: Yup.string(),
    avatar: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      avatar: currentUser?.avatar || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
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
      setValue("avatar", base64Data); // Formdaki 'image' alanının değerini güncelle
    };

    if (file) {
      reader.readAsDataURL(file); // Dosyayı base64 formatına dönüştürmek için okuma işlemini başlat
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = { ...data, image: imageData };
      await icpaws_backend.updateUser(formData, principal);
      mutatuePanel();
      enqueueSnackbar("Update success!");
      onClose();
      console.info("DATA", data);
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
        sx: { maxWidth: 350 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Update Profile</DialogTitle>

        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            pt={3}
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(1, 1fr)",
            }}
          >
            <RHFTextField name="name" label="User Name"  />
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />{" "}
          </Box>
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
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}