
/********************************************************************************** 
WEB700 
– Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
No part* of this assignment has been copied manually or electronically from any other source* (including 3rd party web sites) or distributed to other students.
** Name: Aakib Kibria Khan Student ID: 157802224 Date: 2/17/2024


*********************************************************************************/

var express = require("express");
var path = require("path");
var collegeData = require("./Modules/collegeData"); // Assuming collegeData.js is in the same directory

var app = express();
var HTTP_PORT = process.env.PORT || 8080;

// Middleware to parse JSON requests
app.use(express.json());

// Route to get all students
app.get("/students", (req, res) => {
    collegeData.getAllStudents()
        .then(students => {
            res.json(students);
        })
        .catch(error => {
            res.status(404).json({ message: "no results" });
        });
});

// Route to get TAs
app.get("/tas", (req, res) => {
    collegeData.getTAs()
        .then(tas => {
            res.json(tas);
        })
        .catch(error => {
            res.status(404).json({ message: "no results" });
        });
});

// Route to get all courses
app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then(courses => {
            res.json(courses);
        })
        .catch(error => {
            res.status(404).json({ message: "no results" });
        });
});

// Route to get student by number
app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num)
        .then(student => {
            res.json(student);
        })
        .catch(error => {
            res.status(404).json({ message: "no results" });
        });
});

// Route to serve home.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

// Route to serve about.html file
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

// Route to serve htmlDemo.html file
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "htmlDemo.html"));
});

// Route for unmatched routes
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Initialize data and start the server
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("Server listening on port: " + HTTP_PORT);
        });
    })
    .catch(err => {
        console.error("Error initializing data:", err);
    });
