import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import TadarusRoute from "./routes/TadarusRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// handling error syntax input
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error(err.type);
    return res.status(400).send({ status: 404, message: err.message }); // Bad request
  }
  next();
});

app.use("/api", TadarusRoute);
app.use((req, res) => {
  res.status(404).send({
    message: "Not Found!",
  });
});

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT} `);
});
