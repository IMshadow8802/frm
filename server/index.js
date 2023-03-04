const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbPath = path.resolve(__dirname, "Survey.db");
const db = new sqlite3.Database(dbPath);

app.get("/api/get/tblCountry", (req, res) => {
  db.all(
    "SELECT Code as id, Country as description FROM tblCountry ORDER BY Country",
    (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
      } else {
        res.send(rows);
      }
    }
  );
});

app.get("/api/get/tblSurveyRate1", (req, res) => {
  db.all(
    "SELECT DISTINCT 0 as id,SL as description FROM tblSurveyRate ORDER BY SL",
    (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
      } else {
        res.send(rows);
      }
    }
  );
});

app.get("/api/get/tblSurveyRate2", (req, res) => {
  db.all(
    "SELECT DISTINCT 0 as id, Perc as description FROM tblSurveyRate",
    (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
      } else {
        res.send(rows);
      }
    }
  );
});

app.get("/api/get/tblSurveyRate", (req, res) => {
  const countryId = req.query.country;
  const mode = req.query.mode;
  const sl = req.query.sl;
  const perc = req.query.perc;

  db.all(
    `SELECT Rate FROM tblSurveyRate WHERE Country = '${countryId}' AND MODE = '${mode}' AND SL = '${sl}' AND Perc = '${perc}'`,
    (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
      } else {
        if (rows.length === 0) {
          res.send("No matching rate found");
        } else {
          res.send(rows[0].Rate.toString());
        }
      }
    }
  );
});

// Start the server and listen on port 5000
app.listen(5555, () => {
  console.log("Server is running on port 5555");
});
