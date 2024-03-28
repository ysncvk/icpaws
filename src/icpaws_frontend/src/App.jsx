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
  }, []);

  const handleGreet = async (e) => {
    e.preventDefault();
    try {
      const greeting = await actor.greet();
      console.log(greeting)
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
        identityProvider: process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app"
        : `http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943`,

        onSuccess: async () => {
          const identity = authClient.getIdentity();
          console.log('identity: ', identity)
          const agent = new HttpAgent({ identity });

          actor = createActor(process.env.CANISTER_ID_ICPAWS_BACKEND, { agent });
          console.log('actor: ', actor)
        },
      });
    } catch (error) {
      console.error(error);
    }
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

          <img src="/logo.png" alt="Your logo" width="1000" style={{ borderRadius: '30px', paddingLeft:'80px' }} />
      
          <div>

          <button onClick={handleLogin}>Login!</button> <br/>
          <button onClick={handleGreet}>Click Me!</button> <br/><br/><br/>
          {greet}
          </div>
      </Box>
      <Box sx={{ p: 1, paddingLeft:10, paddingRight:10}}>
      <PetList pets={pets} />
      </Box>
      <CreatePetForm/>
    </main>
  );
}

export default App;
