import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card , Typography} from "@mui/material";


function CourseDetail() {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);

  console.log(id);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3000/admin/courses`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setCourses(data.course);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourse();
  }, [id]);

  let course;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].Id === id) {
      course = courses[i];
    }
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Card style={{ margin: 10, width: 300, minHeight: 200 }}>
      <Typography textAlign={"center"} variant="h5">
        {course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {course.description}
      </Typography>
    </Card>
  );
}

export default CourseDetail;
