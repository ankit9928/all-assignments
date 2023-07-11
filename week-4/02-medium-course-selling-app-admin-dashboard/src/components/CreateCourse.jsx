import React from "react";
import { Button, Card, TextField } from "@mui/material";

/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.

function CreateCourse() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");

  const handleCreateCourse = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify({
          title,
          description,
          price,
        }),
      });

      const data = await response.json();
      setDescription("");
      setTitle("");
      setPrice("");
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
     


      <div style={{ display: "flex", justifyContent: "center", margin:150 }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            id="title"
            type={"text"}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />

          <TextField
            id="description"
            type={"text"}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <br />
          <br />
          <TextField
            id="price"
            type={"text"}
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <Button variant="contained" onClick={handleCreateCourse}>Create Course</Button>
        </Card>
      </div>
     
  );
}
export default CreateCourse;
