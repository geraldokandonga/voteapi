const Region = require("../regions/region.model");
const Constituency = require("../constituencies/constituency.model");
const PollingStation = require("../pollingstations/pollingstation.model");
const catchAsync = require("../_utils/catchAsync");
const AppError = require("../_utils/appError");

exports.countAllRegions = catchAsync(async (req, res, next) => {
  const regions = await Region.estimatedDocumentCount();

  res.status(201).json({
    status: "success",
    data: regions
  });
});

exports.countAllConstituencies = catchAsync(async (req, res, next) => {
  const constituencies = await Constituency.estimatedDocumentCount();

  res.status(201).json({
    status: "success",
    data: constituencies
  });
});

exports.countAllPollingStations = catchAsync(async (req, res, next) => {
  const countFixedPoints = await PollingStation.countDocuments(
    { type: "Fixed Points" },
    function(err, count) {
      if (err) return next(new AppError("Something went wrong!", 400));
      return count;
    }
  );

  const countMobileTeams = await PollingStation.countDocuments(
    { type: "Mobile Teams" },
    function(err, count) {
      if (err) return next(new AppError("Something went wrong!", 400));
      return count;
    }
  );

  res.status(201).json({
    status: "success",
    data: {
      fixed: countFixedPoints,
      mobile: countMobileTeams,
      total: countMobileTeams + countFixedPoints
    }
  });
});
