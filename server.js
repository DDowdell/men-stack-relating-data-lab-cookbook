const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const authController = require('./controllers/auth.js');
const foodsController = require('./controllers/foods.js');

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000';




//Connections==================================================================
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//Midware======================================================================
// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passUserToView);

//Routes below==================================================================

// GET /(home page)
app.get("/", (req, res) => {
  res.render("index.ejs", {
    user: req.session.user,
  });
});

app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/foods', foodsController);

//Routes above=====================================================================
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});




// Reference this chart when building your RESTful routes in your controller.

// Action	Route	HTTP Verb
// Index	‘/users/:userId/foods’	GET
// New	‘/users/:userId/foods/new’	GET
// Create	‘/users/:userId/foods’	POST
// Show	‘/users/:userId/foods/:itemId’	GET
// Edit	‘/users/:userId/foods/:itemId/edit’	GET
// Update	‘/users/:userId/foods/:itemId’	PUT
// Delete	‘/users/:userId/foods/:itemId’	DELETE

// htmlhead.ejs <!DOCTYPE html>
// <html lang=“en”>
//   <head>
//     <meta charset=“UTF-8" />
//     <meta name=“viewport” content=“width=device-width, initial-scale=1.0" />
//     <!-- BULMA CSS Library -->
//     <link
//       rel=“stylesheet”
//       href=“https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css”
//     />
//     <title><%= title %></title>
//   </head>
//   <body>

//   navbar.ejs
// 4:11
// <nav class=“navbar is-light” role=“navigation” aria-label=“main navigation”>
//   <div class=“navbar-menu is-active”>
//     <div class=“navbar-start”>
//       <a class=“navbar-item” href=“/”>Home</a>
//       <a class=“navbar-item” href=“/songs”>View All Songs</a>
//       <a class=“navbar-item” href=“/songs/new”>Add a Song</a>
//     </div>
//   </div>
// </nav>












