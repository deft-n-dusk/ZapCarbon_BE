module.exports = {
  car_travel: (data) => data.distance * 0.21, // kg CO2 per km
  flight: (data) => data.distance * 0.15,
  electricity_usage: (data) => data.kwh * 0.7,
  natural_gas_usage: (data) => data.therms * 5.3,
  public_transport: (data) => data.distance * 0.1,
  meat_consumption: (data) => data.kg * 27,
  waste_generated: (data) => data.kg * 0.6,
  water_usage: (data) => data.liters * 0.0005,
  bus_travel: (data) => data.distance * 0.1,
  train_travel: (data) => data.distance * 0.05,
  motorcycle_travel: (data) => data.distance * 0.12,
  lpg_usage: (data) => data.kg * 2.98,
  coal_usage: (data) => data.kg * 2.5,
  paper_usage: (data) => data.kg * 1.8,
  recycling: (data) => data.kg * -0.9 // negative because it's eco-friendly
};

