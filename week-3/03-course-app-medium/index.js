const { error } = require("console");
const express = require("express");
const app = express();
const fs = require("fs");
const jwt = require("jsonwebtoken");

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// so in this assignment we will save are array to the file that what we are basically doing

try {
  ADMINS = JSON.parse(fs.readFileSync("admins.json", "utf8"));
  USERS = JSON.parse(fs.readFileSync("users.json", "utf8"));
  COURSES = JSON.parse(fs.readFileSync("courses.json", "utf8"));
} catch {
  ADMINS = [];
  USERS = [];
  COURSES = [];
}

seckretkey = "logan";

const authenticatejwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, seckretkey, (error, user) => {
      if (error) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post("/admin/signup", (req, res) => {
  const { username, password } = req.body;

  const admin = ADMINS.find((a) => a.username === username);

  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const newAdmin = { username, password };
    ADMINS.push(newAdmin);
    fs.writeFileSync("admins.json", JSON.stringify(ADMINS)); // we stringfy the object because we can write only the strings into the file
    const token = jwt.sign({ username, role: "admin" }, seckretkey, {
      expiresIn: "1h",
    }); // paylode include the info usernmae and role
    res.json({ message: "Admin created successfully", token });
  }
});

app.post("/admin/login", (req, res) => {
  const { username, password } = req.headers;

  const admin = ADMINS.find(
    (a) => a.username === username && a.password === password
  );

  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, seckretkey, {
      expiresIn: "1h",
    }); // in this paylode to the token we have whole admin object containing the usenmae and password
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.post("/admin/courses", authenticatejwt, (req, res) => {
  const course = req.body;
  course.Id = Date.now().toString();

  COURSES.push(course);
  fs.writeFileSync("courses.json", JSON.stringify(COURSES));
  res.json({ message: "Course created successfully", courseId: course.Id });
});

app.put("/admin/courses/:courseId", authenticatejwt, (req, res) => {
  const courseId = req.params.courseId;
  const course = COURSES.find((c) => c.Id === courseId);

  if (course) {
    Object.assign(course, req.body);
    fs.writeFileSync("courses.json", JSON.stringify(COURSES));
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

app.get("/admin/courses", authenticatejwt, (req, res) => {
  res.json({ course: COURSES });
});

// User routes
app.post("/users/signup", (req, res) => {
  const { username, password } = req.body;

  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = { username, password };
    USERS.push(newUser);
    fs.writeFileSync("users.json", JSON.stringify(USERS));
    const token = jwt.sign({ username, role: "user" }, seckretkey, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
});

app.post("/users/login", (req, res) => {
  const { username, password } = req.headers;

  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = jwt.sign({ username, role: "user" }, seckretkey, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.get("/users/courses", authenticatejwt, (req, res) => {
  res.json({ courses: COURSES });
});

app.post("/users/courses/:courseId", authenticatejwt, (req, res) => {
  const courseId = req.params.courseId;
  const course = COURSES.find((c) => c.Id === courseId);

  if (course) {
    const user = USERS.find(u => u.username === req.user.username);

    if (user) {
      if (!user.purchasedCourses) {
         user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);
      fs.writeFileSync("users.json", JSON.stringify(USERS));
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(403).json({ message: "Course not found" });
  }
});

app.get("/users/purchasedCourses", authenticatejwt,  (req, res) => {
      
     const user = USERS.find(u => u.username === req.user.username);

     if(user){

         res.json({purchsedCourses: user.purchasedCourses || []})
       
     }else{
         res.status(403).json({message: 'user not found'});
     }
   
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
