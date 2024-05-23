const { data } = require("../db/currency.json");

const getCurrencies = (req, res) => {
  const { min_value } = req.query;
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
