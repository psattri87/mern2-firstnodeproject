const router = require("express").Router();
const {
  getCurrencies,
  getCurrencyBySymbol,
  getTitle,
} = require("../controllers/currency.controller");

router.get("/title", getTitle);
router.get("/", getCurrencies);
router.get("/:symbol", getCurrencyBySymbol);

module.exports = router;
