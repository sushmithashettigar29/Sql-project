const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "#23*4.5psw0354",
});

let getRandomUSer = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// Home page
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user`;
  try {
    connection.query(q, (error, result) => {
      if (error) throw error;
      let count = result[0]["count(*)"];
      // console.log(result[0]["count(*)"]);
      res.render("home.ejs", { count });
    });
  } catch (error) {
    console.log(error);
    res.send("Some error in DB");
  }
  // res.send("Welcome to home page");
});

// Show Route
app.get("/user", (req, res) => {
  // res.send("success");
  let q = `SELECT * FROM user`;
  try {
    connection.query(q, (error, users) => {
      if (error) throw error;
      // console.log(result);
      res.render("user.ejs", { users });
    });
  } catch (error) {
    console.log(error);
    res.send("Some error in DB");
  }
});

// Edit Route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  console.log("Id : ", id);
  let q = `SELECT * FROM user WHERE id= "${id}"`;
  console.log(id);
  try {
    connection.query(q, (error, result) => {
      if (error) throw error;
      console.log(result);
      res.render("edit.ejs");
    });
  } catch (error) {
    console.log(error);
    res.send("Some error in DB");
  }
});

app.listen("8080", () => {
  console.log("Server is listening to port 8080");
});

// console.log(getRandomUSer());

/*

// let q = "SHOW TABLES";
// Inserting New Data
// let q = "INSERT INTO user (id, username, email, password) VALUES (?,?,?,?)";
let q = "INSERT INTO user (id, username, email, password) VALUES ?";
// let users = [
//   ["12334", "123_newuserer", "abc@gmail.comds", "abbcdew"],
//   ["12345", "123_newuserfre", "abc@gmail.comdsa", "abbd1sad"],
// ];
let data = [];
for (let i = 1; i <= 100; i++) {
  data.push(getRandomUSer()); // 100 faske data
}

try {
  connection.query(q, [data], (error, result) => {
    if (error) throw error;
    console.log(result);
    // console.log(result.length);
    // console.log(result[0]);
    // console.log(result[1]);
  });
} catch (error) {
  console.log(error);
}

connection.end();

*/
