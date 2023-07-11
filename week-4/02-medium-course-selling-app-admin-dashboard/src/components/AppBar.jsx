import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export function Appbar() {
  const [userEmail, setuserEmail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });

        const data = await response.json();
        setuserEmail(data.username);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (userEmail) {
    return (
      <div
        style={{ display: "flex", justifyContent: "space-between", padding: 5 }}
      >
        <div>
          <Typography variant="h6">Coursera</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div> {userEmail}</div>
          <br />
          <div style={{ marginRight: 20 }}>
            <Button
              variant="contained"
              onClick={() => {
                localStorage.removeItem("Token");
                window.location = "/";
              }}
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
    );
  }else{

    return (
      <div
        style={{ display: "flex", justifyContent: "space-between", padding: 5 }}
      >
        <div>
          <Typography variant="h6">Coursera</Typography>
        </div>
  
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 20 }}>
            <Button variant="contained" component={Link} to="/register">
              Sign Up
            </Button>
          </div>
  
          <div>
            <Button variant="contained" component={Link} to="/login">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  
}
