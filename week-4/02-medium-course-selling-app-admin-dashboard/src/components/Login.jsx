import React from "react";
import { Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Card } from "@mui/material";

/// File is incomplete. You need to add input boxes to take input for users to login.

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          username: email,
          password: password,
        },
      });

      const data = await response.json();

      localStorage.setItem("Token", data.token);
      window.location = "/"
      setEmail("");
      setPassword("");
      console.log("no problem");
    } catch (error) {
      console.loge(error);
    }
  };

  return (
    <>
      <div
        style={{
          fontSize: 20,
          color: "black",
          paddingTop: 150,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography> Welcome Back Sign in below </Typography>
      </div>

      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
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
          <Button variant="contained" onClick={handleLogin}>
            Sign in
          </Button>
          <br />
          <br />
        </Card>
      </div>
    </>
  );
}

export default Login;
