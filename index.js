const express = require("express");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const app = express();
const upload = multer({ dest: "./uploads" });
const imageStore = {};
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "uploads", "index.html"));
});

app.post("/", upload.single("avatar"), (req, res) => {
  const uniqueId = uuidv4();
  imageStore[uniqueId] = req.file.filename;
  const imageUrl = `http://localhost:3024/${uniqueId}`;
  res.redirect(imageUrl);
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  const filename = imageStore[id];

  if (filename) {
    res.send(
      `<img width="100px" height="100px" src="/uploads/${filename}" alt="Uploaded Image">`
    );
  } else {
    res.status(404).send("Image not found");
  }
});

app.listen(3024, () => {
  console.log("Server is running on port 3024");
});
