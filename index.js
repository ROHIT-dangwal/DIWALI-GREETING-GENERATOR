const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "./uploads" });

// Serve static files in the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", upload.single("avatar"), (req, res) => {
  // Display the uploaded image with the correct src path
  res.send(`<img src="/uploads/${req.file.filename}" alt="Uploaded Image">`);
  console.log(req.file);
  console.log(req.body);
});

app.get("/card", (req, res) => {
  res.send("Hello");
});

app.listen(3024, () => {
  console.log("Server is running on port 3024");
});
