import express from 'express';
const app = express();
const router = express.Router();

app.get("/", (req, res, next) => {
    console.log("GET request")
})
export default app;