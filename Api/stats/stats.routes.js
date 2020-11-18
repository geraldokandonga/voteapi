const express = require("express");
const statsController = require("./stats.controller");

const router = express.Router();

router.get("/regions", statsController.countAllRegions);
router.get("/constituencies", statsController.countAllConstituencies);
router.get("/polling-stations", statsController.countAllPollingStations);

module.exports = router;
