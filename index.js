// Import required modules
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up body-parser middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Array to store tasks (moved outside of route handlers)
const workTasks = [];
const homeTasks = [];

// Define your routes here
app.get('/', (req, res) => {
  // Assuming tasks is an array of task objects
  // Add the taskIndex property to each task object before passing the tasks array to the 'index.ejs' template
  const tasksWithIndex = homeTasks.map((task, index) => ({ ...task, taskIndex: index }));

  res.render('index', { homeTasks: tasksWithIndex });
});
app.post("/create-home-task", (req, res) => {
  // Retrieve form data from req.body
  const { taskTitle, taskOwner } = req.body;

  // Create a new task object based on the form data
  const newTask = {
    title: taskTitle,
    owner: taskOwner,
  };

  // Save the new task to your data store (e.g., tasks array)
  homeTasks.push(newTask);

  // Redirect back to the homepage after creating the task
  res.redirect("/");
});

app.get("/work", (req, res) => {
  // Assuming tasks is an array of task objects
  // Add the taskIndex property to each task object before passing the tasks array to the 'work.ejs' template
  const tasksWithIndex = workTasks.map((task, index) => ({ ...task, taskIndex: index }));

  res.render("work", { workTasks: tasksWithIndex });
});

app.post("/create-work-task", (req, res) => {
  // Retrieve form data from req.body
  const { taskTitle, taskOwner } = req.body;

  // Create a new task object based on the form data
  const newTask = {
    title: taskTitle,
    owner: taskOwner,
  };

  // Save the new task to your data store (e.g., tasks array)
  workTasks.push(newTask);

  // Redirect back to the homepage after creating the task
  res.redirect("/work");
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
