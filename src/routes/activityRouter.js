const express = require("express");
const activityRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const Activity = require("../models/activity.js");
const emissionFactors = require("../utils/emissionFactors.js");
const activityMetadata = require("../utils/activityMetaData.js");

// GET /api/activities/types - Get list of all available activity types with metadata
activityRouter.get("/types", (req, res) => {
  try {
    const typesWithDetails = Object.keys(emissionFactors).map((type) => {
      const metadata = activityMetadata[type];

      if (!metadata) {
        console.warn(`⚠️  No metadata found for activity type: ${type}`);
      }

      return {
        type,
        field: metadata?.field || "value",
        label: metadata?.label || type
      };
    });

    res.status(200).json(typesWithDetails);
  } catch (error) {
    console.error("Failed to get activity types:", error);
    res.status(500).json({ error: "Failed to get activity types." });
  }
});



// POST /api/activities - Add a new activity
activityRouter.post("/add", userAuth, async (req, res) => {
  try {
    const { type, inputData } = req.body;
    const user = req.user;

    if (!type || !inputData) {
      throw new Error("Missing type or input data.");
    }

    if (!emissionFactors[type]) {
      throw new Error("Unsupported activity type.");
    }

    // Calculate emission using local utility
    const emission = emissionFactors[type](inputData);

    const newActivity = new Activity({
      userId: user._id,
      type,
      inputData,
      emission,
      date: new Date()
    });

    await newActivity.save();

    res.status(201).send({
      message: `${type} activity logged successfully.`,
      activity: newActivity,
      unit: "kg CO2e"
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});


// GET /api/activities/history?page=1&limit=10
activityRouter.get("/history", userAuth, async (req, res) => {
  try {
    const user = req.user;

    // Parse pagination params from query string
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Count total activities
    const totalRecords = await Activity.countDocuments({ userId: user._id });

    // Paginate query
    const activities = await Activity.find({ userId: user._id })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    // Add unit to each activity
    const activitiesWithUnits = activities.map((activity) => ({
      ...activity._doc,
      unit: "kg CO2e"
    }));

    res.json({
      data: activitiesWithUnits,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
      totalRecords,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});


module.exports = activityRouter;
