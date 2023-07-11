import { Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function ShowCourses() {
  const [courses, setCourses] = React.useState([]);

  // Add code to fetch courses from the server
  // and set it in the courses state variable.

  useEffect(() => {
    //console.log("render")
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/courses/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });

        const data = await response.json();
        setCourses(data.course);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={{display:"flex", flexWrap:"wrap"}}>

      {courses.map(course => {
        return <Course course ={course}/>
      })}
    </div>
  );
}

function Course(props) {
  return (
    <Card style={{margin: 10, width:300, minHeight:200}}>
      <Typography textAlign={"center"} variant="h5">{props.course.title}</Typography>
      <Typography textAlign={"center"} variant="subtitle1">{props.course.description}</Typography>
    </Card>
  );
}

export default ShowCourses;
