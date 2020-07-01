const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const cookieParser = require('cookie-parser');
const port = 8000;

const app = express();

const db = require("./config/mongoose");



//use for session cookie
const session = require('express-session');
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')




//passport JWT
const passportJwt = require('./config/passport-jwt-strategy');


const MongoStore = require('connect-mongo')(session);


app.use(express.static(path.join(__dirname, "/assets")));
// console.log("This is  Path", __dirname);
app.use(express.urlencoded());
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("views", "./views");


//mongoStore is used to store the session cookie in the db
app.use(
  session({
    name: 'quora',

    secret: 'quora',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100

    },
    store: new MongoStore({
      mongooseConnection: db,
      autoRemove: 'disabled',
    },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
)

app.use(passport.initialize());
app.use(passport.session());

//setup the current user usages
//whenver the app is getting initialized  passport is getting initialized and this function is getting called
//it will check whether the session cookie is present or not 
//this function is automatically is being called as a middleware

app.use(passport.setAuthenticatedUser);



//routes
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log("Error in running the sever");
  }
  console.log(`Server is running on ${port}`);
});
