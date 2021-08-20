import express from "express";
import cors from "cors";
import path from "path";
import api from "./routes/routes";

const app = express();
const port = process.env.PORT || 5000;

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Configure the CORs middleware
app.use(cors());

// Configure app to use route
app.use("/api/v1/", api);

// This middleware informs the express application to serve our compiled React files
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Catch any bad requests
app.get("*", (req, res) => {
  res.status(200).json({
    msg: "Catch All",
  });
});

app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));
