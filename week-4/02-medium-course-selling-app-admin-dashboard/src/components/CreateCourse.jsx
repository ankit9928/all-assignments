import React from "react";
import { Button, Card, TextField } from "@mui/material";
import axios from "axios";

/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.

function CreateCourse() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const [price, setPrice] = React.useState("");

  const handleCreateCourse = async () => {
    try {

      const response = await axios.post("http://localhost:3000/admin/courses",{
          title,
          description,
          imageLink: image,
          published: true,
          price,
        }, {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
        });

      const data = response.data;
      setDescription("");
      setTitle("");
      setPrice("");
      setImage("")
      alert(data.message);
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{display: "flex", justifyContent: "center", minHeight: "80vh",  flexDirection: "column"}}> 
    <div style={{ display: "flex", justifyContent: "center", margin: 150 }}>
      <Card variant="outlined" style={{ width: 400, padding: 20}}>
        <TextField
          style={{ marginBottom: 10 }}
          fullWidth={true}
          variant="outlined"
          label={"Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />

        <TextField
          style={{ marginBottom: 10 }}
          fullWidth={true}
          variant="outlined"
          label={"Description"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <br />
        <TextField
          style={{ marginBottom: 10 }}
          fullWidth={true}
          variant="outlined"
          label="Image-link"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        <br />
        <TextField
          style={{ marginBottom: 10 }}
          fullWidth={true}
          label="Price"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <br />
        <Button size={"large"} variant="contained" onClick={handleCreateCourse}>
          Add course Course
        </Button>
      </Card>
    </div>
    </div>
  );
}
export default CreateCourse;
