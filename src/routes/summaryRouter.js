const express = require("express");
const summaryRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const Activity = require("../models/activity.js");

// GET /api/summary - Get aggregated carbon footprint summary
summaryRouter.get("/", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    // Aggregation pipeline
    const result = await Activity.aggregate([
      { $match: { userId: userId } },

      // 1. Total Emissions
      {
        $group: {
          _id: null,
          totalEmissions: { $sum: "$emission" },
        },
      },
    ]);

    const totalEmissions = result.length > 0 ? result[0].totalEmissions : 0;

    // Breakdown by activity type
    const breakdown = await Activity.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: "$type",
          totalEmission: { $sum: "$emission" },
        },
      },
    ]);

      // Emissions over time (daily within months)
    const emissionsOverTime = await Activity.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$date" },
            month: { $month: "$date" },
          },
          totalEmission: { $sum: "$emission" },
        },
      },
      {
        $sort: { "_id.month": 1, "_id.day": 1 },
      },
    ]);

    // Format emissionsOverTime to friendly output
    const emissionsByDayAndMonth = emissionsOverTime.map((item) => ({
      day: item._id.day,
      month: item._id.month,
      totalEmission: item.totalEmission,
    }));


    res.json({
  totalEmissions,
  unit: "kg CO2e",
  breakdownByType: breakdown.map((item) => ({
    ...item,
    unit: "kg CO2e"
  })),
 emissionsOverTime: emissionsByDayAndMonth.map((item) => ({
  ...item,
  unit: "kg CO2e"
}))
});

  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

module.exports = summaryRouter;
