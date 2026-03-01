require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

//authRoutes middleware
app.use("/api", require("./routes/authRoutes"));

//projectRoutes middleware
app.use("/api/projects", require("./routes/projectRoutes"));

//taskRoutes middleware
app.use("/api/task", require("./routes/taskRoutes"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

