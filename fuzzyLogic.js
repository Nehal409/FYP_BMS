const fuzzylogic = require("fuzzylogic");
const assert = require("assert");

// Define the "rules" object and its methods
const rules = {
  and: (a, b) => Math.min(a, b),
  or: (a, b) => Math.max(a, b),
  not: (a) => 1 - a,
};

// Add a dummy implementation for cbA and cbB since they are used in assertions
const cbA = () => {};
const cbB = () => {};

// Perform assertions using the "rules" object
assert.ok(rules.and(0.1, 0.2) == 0.1);
assert.ok(rules.or(0.1, 0.2) == 0.2);
assert.ok(rules.not(0.1) == 0.9);

// Define a function to calculate the cooling power based on room temperature
var coolingPowerCalc = function (temperature) {
  var cold = fuzzylogic.trapezoid(temperature, 10, 10, 18, 18);
  var comfortable = fuzzylogic.trapezoid(temperature, 15, 18, 25, 27);
  var hot = fuzzylogic.trapezoid(temperature, 22, 25, 30, 30);

  var coolingPower = {
    low: rules.or(cold, comfortable),
    medium: rules.or(rules.and(comfortable, hot), rules.and(cold, hot)),
    high: rules.and(comfortable, hot),
  };

  return coolingPower;
};

function fuzzyToPercentage(value) {
  return Math.round(value * 100);
}

// Test the cooling power calculation for different room temperatures
var roomTemperatures = [12, 18, 20, 24, 28];
roomTemperatures.forEach((temperature) => {
  var coolingPower = coolingPowerCalc(temperature);
  console.log(`Room Temperature: ${temperature}°C`);
  console.log(
    `Cooling Power: Low - ${fuzzyToPercentage(
      coolingPower.low
    )}%, Medium - ${fuzzyToPercentage(
      coolingPower.medium
    )}%, High - ${fuzzyToPercentage(coolingPower.high)}%`
  );
  console.log("--------------");
});
