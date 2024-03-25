
import Card from '@mui/material/Card';

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
      <ListItemText
      primary="Name of the pet"
      secondary={name}
      primaryTypographyProps={{
        typography: 'caption',
        color: 'text.disabled',
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: 'span',
        color: 'text.primary',
        typography: 'subtitle1',
      }}
    />
     <ListItemText
      primary="Species of Pet"
      secondary={species}
      primaryTypographyProps={{
        typography: 'caption',
        color: 'text.disabled',
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: 'span',
        color: 'text.primary',
        typography: 'subtitle1',
      }}
    />
      </Card>     
  );
}


