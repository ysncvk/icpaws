import * as Yup from 'yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import FormProvider, { RHFTextField } from './components/hook-form';

import {icpaws_backend} from "../../declarations/icpaws_backend";

export default function CreatePetForm({ onPetCreated }) {
  const [imageData, setImageData] = useState(''); // Dosya verisinin base64 formatındaki değerini saklamak için state kullanıyoruz

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    image: Yup.string().required(), // Image alanı zorunlu
  });

  const defaultValues = {
    name: '',
    species: '',
    breed: '',
    age: '',   
    gender: '',
    adoption: '',
    place: '',
    description: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Image state'inden gelen değeri form datasına ekle
      const formData = { ...data, image: imageData };
      const id= icpaws_backend.create(formData)
      console.info('DATA', formData);
      console.log("id:",id)
      onPetCreated();
    } catch (error) {
      console.error(error);
    }
  });

  // Dosya seçildiğinde bu fonksiyon çalışacak
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Data = reader.result; // Dosya verisini base64 formatına dönüştür
      setImageData(base64Data); // State'i güncelle
      setValue('image', base64Data); // Formdaki 'image' alanının değerini güncelle
    };

    if (file) {
      reader.readAsDataURL(file); // Dosyayı base64 formatına dönüştürmek için okuma işlemini başlat
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Box
        mt={2}
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
        }}
      >
        <RHFTextField name="name" label="Pet Name" required />
        <RHFTextField name="species" label="species" required />
        <RHFTextField name="breed" label="breed" required />
        <RHFTextField name="age" label="age" required />
        <RHFTextField name="gender" label="gender" required />
        <RHFTextField name="adoption" label="adoption" required />
        <RHFTextField name="place" label="place" required />
        <RHFTextField name="description" label="description" required />
        <input type="file" onChange={handleFileChange} accept="image/*" /> {/* Image yükleme alanı */}
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Ekle
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}
