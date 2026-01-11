import express from "express";
import usersRoutes from "./routes/users.js";

const app = express();
const PORT = 3000;

// ✅ 1) LOGGER (qui)
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`
    );
  });

  next();
});

// ✅ 2) BODY PARSER
app.use(express.json());

// ✅ 3) ROUTES
app.use("/users", usersRoutes);

app.get("/", (req, res) => res.send("Benvenuto nella Homepageee!"));

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
