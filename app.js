import * as dotenv from 'dotenv'
process.env.NODE_ENV !== "production" ? dotenv.config() : void 0;
// aGr6omr05bbCvHWZ Baloo Bhai 2, aventa
import createError from "http-errors"
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session'
import ejsMate from 'ejs-mate';
import passport from 'passport';
import localStrategy from 'passport-local';
import postRouter from './routes/post_router.js'
import usersRouter from './routes/users_router.js'
import methodOverride from "method-override";
import ExpressError from './utils/ExpressError.js'
import User from "./models/user_model.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const appUrl = process.env.APP_URL
import "./config/dbConfig.js"
import sessionConfig from "./config/sessionConfig.js"

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

import UserApi from './controllers/api/user_controller_api.js'

// routes
app.use("/", postRouter);
app.use("/", usersRouter);
app.use("/controllers/api/user_controller_api", UserApi);

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
    console.error(err);
    // render the error page
    res.status(err.status || 500).render("partials/error_view", { err });
});

export default app;