import { useState, useEffect } from 'react';
import { createActor, icpaws_backend } from 'declarations/icpaws_backend';
import CreatePetForm from './createPet';
import PetList from './components/pet-list';
import Box from '@mui/material/Box';
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";

function App() {
  const [pets, setPets] = useState([]);
  const [greet,setGreet] = useState();
  let actor = icpaws_backend;

  useEffect(() => {
    async function fetchData() {
      const pets = await icpaws_backend.list();
      setPets(pets);
    }
    fetchData();
  }, [pets]);

  const handleGreet = async (e) => {
    e.preventDefault();
    try {
      const greeting = await actor.greet();
      setGreet(greeting)
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let authClient = await AuthClient.create();
      await authClient.login({
        identityProvider: process.env.II_URL,
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const agent = new HttpAgent({ identity });
          actor = createActor(process.env.GREET_BACKEND_CANISTER_ID, { agent });
          const pets = await icpaws_backend.list();
          setPets(pets);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handlePetCreated = async () => {
    const updatedPets = await icpaws_backend.list();
    setPets(updatedPets);
  };

  return (
    <main>
      <Box  
      gap={5}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        sx={{ pb: 3, borderRadius: '10px' }}
      >

          <img src="src/icpaws_frontend/public/logo.png" alt="Your logo" width="1000" style={{ borderRadius: '30px', paddingLeft:'80px' }} />
      
          <div>

          <button onClick={handleLogin}>Login!</button> <br/>
          <button onClick={handleGreet}>Click Me!</button> <br/><br/><br/>
          {greet}
          </div>
      </Box>
      <Box sx={{ p: 1, paddingLeft:10, paddingRight:10}}>
      <PetList pets={pets} />
      </Box>
      <CreatePetForm onPetCreated={handlePetCreated}/>
    </main>
  );
}

export default App;
