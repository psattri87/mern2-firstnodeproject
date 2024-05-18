const { data } = require("../db/users.json");

const getUsers = (req, res) => {
  res.status(200).json(data);
};

const getUserByUUID = (req, res) => {
  const { uuid } = req.params;
  const result = data.find((user) => user.login.uuid === uuid);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).send("Invalid uuid");
  }
  res.status(200).json(data);
};

const getUserById = (req, res) => {
  const { uuid } = req.params;
  const result = data.find((user) => user.login.uuid === uuid);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).send("Invalid user id");
  }
  res.status(200).json(data);
};

const searchUserByGenderAndAge = (req, res) => {
  const { gender, age } = req.query;
  console.log(gender, age);
  let result;
  if (gender && age) {
    result = data.filter((user) => user.gender === gender && Number(user.dob.age) >= Number(age));
  } else if (gender) {
    result = data.filter((user) => user.gender === gender);
  } else if (age) {
    result = data.filter((user) => Number(user.dob.age) >= Number(age));
  }else{
    res.sendStatus(404);
  }
  res.json(result);
};

module.exports = { getUsers, getUserById, searchUserByGenderAndAge };
