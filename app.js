process.env.NODE_ENV !== "production" ? require("dotenv").config() : void 0;
// Gregoris:V28vVPDrYxE0vGmq
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const ejsMate = require("ejs-mate")
const passport = require('passport');
const localStrategy = require('passport-local');
const postRouter = require("./routes/post_router");
const usersRouter = require("./routes/users_router");
const { cookie } = require("express/lib/response");
const methodOverride = require("method-override")
const ExpressError = require("./utils/ExpressError");
const User = require('./models/user_model')

const app = express();
const appUrl = process.env.APP_URL
require("./config/dbConfig");
const { sessionConfig } = require("./config/sessionConfig");

// view engine setup
app.engine('ejs', ejsMate)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"))
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// passport config
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.appUrl = process.env.APP_URL
    res.locals.currentUser = req.user
    next()
})

// routes
app.use("/", postRouter);
app.use("/", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.all('*', (err, req, res, next) => {
    next(new ExpressError("Not Found", err));
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500).render("partials/error_view", { err });
});

module.exports = app;
