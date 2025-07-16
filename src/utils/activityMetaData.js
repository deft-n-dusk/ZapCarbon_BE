// Mapping from activity key to required field name and user-friendly label
const activityMetadata = {
  car_travel: { field: "distance", label: "Car Travel (km)" },
  flight: { field: "distance", label: "Flight (km)" },
  electricity_usage: { field: "kwh", label: "Electricity Usage (kWh)" },
  natural_gas_usage: { field: "therms", label: "Natural Gas Usage (therms)" },
  public_transport: { field: "distance", label: "Public Transport (km)" },
  meat_consumption: { field: "kg", label: "Meat Consumed (kg)" },
  waste_generated: { field: "kg", label: "Waste Generated (kg)" },
  water_usage: { field: "liters", label: "Water Used (liters)" },
  bus_travel: { field: "distance", label: "Bus Travel (km)" },
  train_travel: { field: "distance", label: "Train Travel (km)" },
  motorcycle_travel: { field: "distance", label: "Motorcycle Travel (km)" },
  lpg_usage: { field: "kg", label: "LPG Used (kg)" },
  coal_usage: { field: "kg", label: "Coal Used (kg)" },
  paper_usage: { field: "kg", label: "Paper Used (kg)" },
  recycling: { field: "kg", label: "Material Recycled (kg)" }
};


module.exports = activityMetadata;