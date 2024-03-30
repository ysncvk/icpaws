import React, { useEffect } from "react";
import { useAuth } from "./use-auth-client";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useBoolean } from "./components/hooks/use-boolean.js";
import UserQuickEditForm from "./components/user-quick-edit-form.jsx";

function LoggedIn() {
  const [result, setResult] = React.useState("");

  const [currentUser, setCurrentUser] = React.useState();

  const { whoamiActor, logout, principal } = useAuth();

  console.log("currentUser: ", currentUser);

  const quickEdit = useBoolean();

  const  getUser = async () => {
    const user = await whoamiActor.getCurrentUser(principal);
    console.log("user returned backend", user)
    setCurrentUser(user[0]);
  }

  useEffect(() => { 
    getUser();
    async function greetuser() {
      const whoami = await whoamiActor.greet();
      setResult(whoami.toString());
    }
    greetuser();
  }, []);
 
  const handleUpdateUser = () => {
    getUser(); // Re-fetch pets after a new pet is created

    console.error("Error fetching pets after creation:");
  };


  return (
    <>
      <Stack direction="column" p={3}>
        <Typography variant="caption">Hi {result} !</Typography>
        <Typography variant="caption">Hi {currentUser?.name} !</Typography>
        <button id="logout" onClick={logout}>
          log out
        </button>
        <button id="logout" onClick={quickEdit.onTrue}>
          Update Profile
        </button>
      </Stack>
      <UserQuickEditForm
        currentUser={currentUser}
        onClose={quickEdit.onFalse}
        open={quickEdit.value}
        principal={principal}
        mutatuePanel={handleUpdateUser}
      />
    </>
  );
}

export default LoggedIn;
