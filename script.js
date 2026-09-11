function updateUnits() {
  const sys = document.getElementById('unitSystem').value;
  const curr = document.getElementById('currencySymbol').value;

  const lblDistance = document.getElementById('lblDistance');
  const lblEfficiency = document.getElementById('lblEfficiency');
  const lblPrice = document.getElementById('lblPrice');

  let currencyLabel = curr === 'AED' ? 'AED ' : curr + ' ';

  if (sys === 'metric') {
    lblDistance.innerText = "3. Total Trip Distance (km)";
    lblEfficiency.innerText = "4. Vehicle Mileage / Efficiency (km/L)";
    lblPrice.innerText = `5. Fuel Price (${currencyLabel}per Liter)`;
  } else if (sys === 'imperial_us') {
    lblDistance.innerText = "3. Total Trip Distance (miles)";
    lblEfficiency.innerText = "4. Vehicle Mileage / Efficiency (MPG US)";
    lblPrice.innerText = `5. Fuel Price (${currencyLabel}per US Gallon)`;
  } else if (sys === 'imperial_uk') {
    lblDistance.innerText = "3. Total Trip Distance (miles)";
    lblEfficiency.innerText = "4. Vehicle Mileage / Efficiency (MPG UK)";
    lblPrice.innerText = `5. Fuel Price (${currencyLabel}per UK Gallon)`;
  }

  calculateTrip();
}

function validatePassengers() {
  const passInput = document.getElementById('passengers');
  let val = parseFloat(passInput.value);
  if (!isNaN(val)) {
    passInput.value = Math.max(1, Math.round(val));
  }
}

function calculateTrip() {
  const sys = document.getElementById('unitSystem').value;
  let curr = document.getElementById('currencySymbol').value;
  
  let currFormatted = curr === 'AED' ? 'AED ' : curr + ' ';

  const distance = parseFloat(document.getElementById('tripDistance').value) || 0;
  const efficiency = parseFloat(document.getElementById('fuelEfficiency').value) || 0;
  const price = parseFloat(document.getElementById('fuelPrice').value) || 0;
  let passengers = parseInt(document.getElementById('passengers').value) || 1;
  if (passengers < 1) passengers = 1;

  const volSymbol = sys === 'metric' ? 'Liters' : 'Gallons';
  const distSymbol = sys === 'metric' ? 'km' : 'mi';

  document.getElementById('resFuelLabel').innerText = `Total Fuel Required (${volSymbol}):`;
  document.getElementById('resDistCostLabel').innerText = `Running Cost Per ${distSymbol}:`;

  if (distance <= 0 || efficiency <= 0 || price <= 0) {
    document.getElementById('resTotalCost').innerText = currFormatted + "0.00";
    document.getElementById('resCostPerPerson').innerText = currFormatted + "0.00";
    document.getElementById('resFuelNeeded').innerText = "0.00 " + volSymbol;
    document.getElementById('resCostPerDist').innerText = currFormatted + "0.00 / " + distSymbol;
    return;
  }

  const fuelNeeded = distance / efficiency;
  const totalCost = fuelNeeded * price;
  const costPerPerson = totalCost / passengers;
  const costPerDist = totalCost / distance;

  document.getElementById('resTotalCost').innerText = currFormatted + totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  document.getElementById('resCostPerPerson').innerText = currFormatted + costPerPerson.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  document.getElementById('resFuelNeeded').innerText = fuelNeeded.toFixed(2) + " " + volSymbol;
  document.getElementById('resCostPerDist').innerText = currFormatted + costPerDist.toFixed(2) + " / " + distSymbol;
}

window.addEventListener('DOMContentLoaded', updateUnits);
