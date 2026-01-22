const express = require("express");
const cors = require("cors");
const db = require("./db");
const multer = require("multer");
const upload = multer();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/pegawai", (req, res) => {
  const query = "SELECT * FROM pegawai";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching pegawai:", err);
      res.status(500).json({ error: "Failed to fetch pegawai" });
      return;
    }
    res.json(results);
  });
});

app.post("/users", upload.none(), (req, res) => {
  const {kduser,username, password, nama, hakakses, kdklinik, kdcabang } = req.body;

  const query = `INSERT INTO pegawai (kduser, username, password, nama, hakakses, kdklinik, kdcabang) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [kduser, username, password, nama, hakakses, kdklinik, kdcabang];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Failed to create user" });
      return;
    }
    res.json({ message: "Sukses" });
  });
});

app.put("/users/:kduser", upload.none(), (req, res) => {
  const { kduser } = req.params;
  const { username, password, nama, hakakses, kdklinik, kdcabang } = req.body;

  const query = `UPDATE pegawai SET username = ?, password = ?, nama = ?, hakakses = ?, kdklinik = ?, kdcabang = ? WHERE kduser = ?`;
  const values = [username, password, nama, hakakses, kdklinik, kdcabang, kduser];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ error: "Failed to update user" });
      return;
    }
    res.json({ message: "Sukses" });
  });
});

app.delete("/users/:kduser", (req, res) => {
  const { kduser } = req.params;

  const query = "DELETE FROM pegawai WHERE kduser = ?";
  db.query(query, [kduser], (err, results) => {
    if (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ error: "Failed to delete user" });
      return;
    }
    res.json({ message: "Sukses" });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
