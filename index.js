const express = require("express");
const { data } = require("./db/currency.json");
const {
  getCurrencies,
  getCurrencyBySymbol,
} = require("./controllers/currency.controller");
const {
  getUsers,
  getUserById,
  searchUserByGenderAndAge,
} = require("./controllers/users.controller");

const app = express();

const PORT = 3000;

const mySelf = {
  divyanshi: {
    name: "Divyanshi Chaudhary",
    fatherName: "Pushpendra Singh",
    motherName: "Yogendri",
    city: "Faridabad",
    dob: "15/07/2019",
    age: "4",
    cl: "K.G.",
    school: "Harold Public Sr. Sec. School",
  },
  mudit: {
    name: "Mudit Chaudhary",
    fatherName: "Pushpendra Singh",
    motherName: "Yogendri",
    city: "Faridabad",
    dob: "11/02/2017",
    age: "7",
    cl: "2nd",
    school: "Harold Public Sr. Sec. School",
  },
};

app.get("/", (req, res) => {
  res.send("<h1>Currency Database</h1>");
  res.send("<h1>Server is responding...</h1>");
});
app.get("/myself", (req, res) => {
  res.status(200).json(mySelf);
});

app.get("/myself/:name", (req, res) => {
  const { name } = req.params;
  const child = mySelf[name];
  if (!child) {
    res.status(404).send("<h1>Wrong query params</h1>");
  }
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h1>My name is ${child.name}.</h1>`);
  res.write(`<h1>I am a good girl.</h1>`);
  res.write(`<h1>I lives in ${child.city}.</h1>`);
  res.write(`<h1>I study in ${child.cl}. class</h1>`);
  res.write(`<h1>My school name is ${child.school}.</h1>`);
  res.write(`<h1>My father name is ${child.fatherName}. </h1>`);
  res.write(`<h1>My mother name is ${child.motherName}. </h1>`);
  res.write(`<h1>I am ${child.age} years old. </h1>`);
  res.end();
});
app.get("/currencies", getCurrencies);
app.get("/currencies/:symbol", getCurrencyBySymbol);
app.get("/users", getUsers);
app.get("/users/search", searchUserByGenderAndAge);
app.get("/users/:uuid", getUserById);

// app.get("*", (req, res)=>res.status(404).send("Invalid url"));

app.listen(PORT, () => {
  console.log("Listening at", PORT);
});
