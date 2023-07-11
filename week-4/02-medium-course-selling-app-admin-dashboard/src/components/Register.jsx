import React from "react";
import { Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Card } from "@mui/material";

/// File is incomplete. You need to add input boxes to take input for users to register.

function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();
      localStorage.setItem("Token", data.token);
      window.location = "/"
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ fontSize: 20, color: "black", paddingTop: 150, display:"flex", justifyContent:"center" }}>
        <Typography> Welcome To the coursera </Typography>
      </div>

      <br />
          
         <div style={{display:"flex", justifyContent:"center" }}> 
        <Card variant="outlined" style={{ width: 400, padding: 20}}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <TextField
            fullWidth
            id="outlined-basic"
            label="password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button variant="contained" onClick={handleRegister}>
           Sign Up
          </Button>
          <br />
          <br />
        
        </Card>
        </div>
       
    </>
  );
}

export default Register;
