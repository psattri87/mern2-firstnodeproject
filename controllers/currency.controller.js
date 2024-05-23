const { data } = require("../db/currency.json");

function verifyAuth(req) {
  console.log(process.env.ROUTE_PASSWORD)
  const { authorization } = req.headers;
  console.log(process.env.ROUTE_PASSWORD);
  if (!authorization) {
    console.log("authorization not received");
    return false;
  }
  if (authorization !== process.env.ROUTE_PASSWORD) {
    console.log("authorization not matched");
    return false;
  }

  console.log("authorization matched");

  return true;
}

// res.status(403).json({message: "Unauthorized request"});

const getCurrencies = (req, res) => {
  //verify authorization
  if (!verifyAuth(req)) {
    return res.status(403).json({ message: "Unauthorized request" });
  }

  const { min_value } = req.query;
  console.log(Number(min_value));
  if (min_value) {
    const result = data.filter(
      (item) => Number(item.min_size) === Number(min_value)
    );
    return res.status(200).json(result);
  } else {
    return res.status(200).json(data);
  }
};

const getCurrencyBySymbol = (req, res) => {
  const { symbol } = req.params;
  const result = data.find(
    (ele) => ele.id.toLowerCase() === symbol.toLowerCase()
  );
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "Invalid Symbol" });
  }
};

const getTitle = (req, res) => {
  res.send("<h1>Currency Database</h1>");
};

module.exports = { getCurrencies, getCurrencyBySymbol, getTitle };
