const { data } = require("../db/users.json");
// const { getQueryErrors } = require("../validators/user.validators");

const getAllUsers = (req, res) => {
  res.json(data);
};

const getUserById = (req, res) => {
  const { uuid } = req.params;
  const result = data.find((user) => user.login.uuid === uuid);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).send("Invalid uuid");
  }
};

const searchUsersByQuery = (req, res) => {
  let { gender, age } = req.query;

  // const error = getQueryErrors({ age, gender });
  // if (error) {
  //   return res.status(422).json(error);
  // }

  let result;
  if (gender && age) {
    result = data.filter(
      (user) => user.gender === gender && Number(user.dob.age) >= Number(age)
    );
  } else if (gender) {
    result = data.filter(
      (user) => user.gender.toLocaleLowerCase() === gender.toLowerCase()
    );
  } else if (age) {
    result = data.filter((user) => Number(user.dob.age) >= Number(age));
  }
  if (result.length > 0) {
    return res.json(result);
  } else {
    return res.status(404).json({ message: "No record found" });
  }
};

module.exports = { getAllUsers, getUserById, searchUsersByQuery };
