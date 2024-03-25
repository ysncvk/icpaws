import { useState } from 'react';
import { icpaws_backend } from 'declarations/icpaws_backend';
import Header from './header';
import CreatePetForm from './createPet';
import { useEffect } from 'react';

function App() {
  const [pets, setPets] = useState([]);

  // Get Current Proposal Count Function
  useEffect(() => {
    async function fetchData() {
    const pets  = await icpaws_backend.list();
    setPets(pets);
    console.log(pets)
    }
    fetchData();
}, []);


  return (
    <main>
      <Header/>
      <CreatePetForm />

    </main>
  );
}

export default App;
