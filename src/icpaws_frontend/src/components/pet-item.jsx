
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import ListItemText from '@mui/material/ListItemText';

// ----------------------------------------------------------------------

export default function PetItem({ pet }) {
 

  const {
    id,
    name,
    species,
    breed,
    age,
    gender,
    adoption,
    place,
    description,
    image,
  } = pet
  

  console.log('name: ', name)
  console.log('image: ', name)


  return (
   
      <Card>
      <img src={image} alt="Selected image" style={{ maxWidth: '100%', maxHeight: '200px' }} />

      <Stack padding="15px">
       <Stack direction="row" gap={3} alignItems="center">
         <Typography variant='subtitle1' color='text.disabled'> Name of the pet:  </Typography>
         <Typography variant='subtitle1'> {name}  </Typography>
       </Stack>
       <Stack direction="row" gap={3} alignItems="center">
         <Typography variant='subtitle1' color='text.disabled'> Species of the pet:  </Typography>
         <Typography variant='subtitle1'> {species}  </Typography>
       </Stack>
       <Stack direction="row" gap={3} alignItems="center">
         <Typography variant='subtitle1' color='text.disabled'> Breed of the pet:  </Typography>
         <Typography variant='subtitle1'> {breed}  </Typography>
       </Stack>
       <Stack direction="row" gap={3} alignItems="center">
         <Typography variant='subtitle1' color='text.disabled'> Age of the pet:  </Typography>
         <Typography variant='subtitle1'> {age}  </Typography>
       </Stack>

      </Stack>
     
    
      </Card>     
  );
}


