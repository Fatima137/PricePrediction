function navigateToCalculator() {
  window.location.href = 'app.html';
}

function predictPrice() {
  const sqftInput = document.getElementById('sqft');
  const bedroomsInput = document.getElementById('bedrooms');
  const washroomsInput = document.getElementById('washrooms');
  const locationInput = document.getElementById('location');
  const resultElement = document.getElementById('result');

  // Check if any input field is empty
  if (!sqftInput.value || !bedroomsInput.value || !washroomsInput.value || !locationInput.value) {
    resultElement.textContent = "Please fill in all fields.";
    return;
  }

  const sqft = parseFloat(sqftInput.value);
  const bedrooms = parseInt(bedroomsInput.value);
  const washrooms = parseInt(washroomsInput.value);
  const location = locationInput.value;

  // Validate inputs
  if (sqft <= 0 || bedrooms <= 0 || washrooms <= 0) {
    resultElement.textContent = "Invalid input. Please enter values greater than zero.";
    return;
  }

  if (bedrooms > 14) {
    resultElement.textContent = "Invalid input. Bedrooms cannot be more than 14.";
    return;
  }

  if (washrooms+1 > bedrooms) {
    resultElement.textContent = "Invalid input. Bathrooms cannot be more than bedrooms.";
    return;
  }

  // Dummy prediction logic, replace with actual prediction algorithm
  const basePricePerSqft = 200; // Placeholder value
  const cities = {
    'Chikkalasandra': 2100,
    'Uttarahalli': 903,
    'Murugeshpalya': 3106,
    'Sarjapur Road': 1136,
    'Ganga Nagar': 1112,
    'Yelahanka': 1115,
    'Kanakpura Road': 2118,
    'HSR Layout': 1136,
    'Hebbal': 3124,
    'Doddathoguru': 4127,
    'Rajaji Nagar': 1136,
    'Whitefield': 5823,
    'KR Puram': 1136,
    'Himagiri Meadows': 2139,
    'Adarsh Nagar': 642
  };

  const totalPrice = sqft * basePricePerSqft + bedrooms * 5000 + washrooms * 1500 + cities[location];

  resultElement.textContent = `Predicted Price: Rs ${totalPrice}`;
}
// Global variables to store estimated prices and actual prices
let estimatedPrices = [];
let actualPrices = [];

// Function to calculate metrics
function calculateMetrics() {
  // Check if enough estimated prices are available
  if (estimatedPrices.length < 5) {
    console.log('Insufficient data for calculation. Please predict prices for at least 5 properties.');
    return;
  }

  // Check if enough actual prices are available
  if (actualPrices.length < 5) {
    console.log('Insufficient data for calculation. Please enter actual prices for at least 5 properties.');
    return;
  }

  // Calculate regression metrics
  const mae = calculateMAE(actualPrices, estimatedPrices);
  const rmse = calculateRMSE(actualPrices, estimatedPrices);
  const r2 = calculateR2(actualPrices, estimatedPrices);

  console.log('Regression Metrics:');
  console.log('MAE:', mae.toFixed(2));
  console.log('RMSE:', rmse.toFixed(2));
  console.log('R2 Score:', r2.toFixed(2));

  // Dummy classification data for demonstration
  const actualLabels = [1, 0, 1, 1, 0]; // Example: 1 for positive, 0 for negative
  const predictedLabels = [1, 0, 1, 0, 1]; // Example: 1 for predicted positive, 0 for predicted negative

  // Calculate classification metrics
  const accuracy = calculateAccuracy(actualLabels, predictedLabels);
  const precision = calculatePrecision(actualLabels, predictedLabels);
  const recall = calculateRecall(actualLabels, predictedLabels);
  const f1 = calculateF1Score(actualLabels, predictedLabels);
  const confusionMatrix = calculateConfusionMatrix(actualLabels, predictedLabels);

  console.log('Classification Metrics:');
  console.log('Accuracy:', accuracy.toFixed(2));
  console.log('Precision:', precision.toFixed(2));
  console.log('Recall:', recall.toFixed(2));
  console.log('F1 Score:', f1.toFixed(2));
  console.log('Confusion Matrix:', confusionMatrix);

  // Dummy clustering data for demonstration
  const dataPoints = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]; // Example data points for clustering
  const clusterLabels = [0, 1, 0, 1, 0]; // Example cluster labels

  // Calculate clustering metric
  const silhouetteScore = calculateSilhouetteScore(dataPoints, clusterLabels);

  console.log('Clustering Metric:');
  console.log('Silhouette Score:', silhouetteScore.toFixed(2));
}

// Dummy function to calculate MAE (replace with actual calculation)
function calculateMAE(actual, estimated) {
  return Math.abs(actual.reduce((acc, val, idx) => acc + (val - estimated[idx]), 0) / actual.length);
}

// Dummy function to calculate RMSE (replace with actual calculation)
function calculateRMSE(actual, estimated) {
  const squaredErrors = actual.map((val, idx) => Math.pow(val - estimated[idx], 2));
  const meanSquaredError = squaredErrors.reduce((acc, val) => acc + val, 0) / actual.length;
  return Math.sqrt(meanSquaredError);
}

// Dummy function to calculate R2 Score (replace with actual calculation)
function calculateR2(actual, estimated) {
  const meanActual = actual.reduce((acc, val) => acc + val, 0) / actual.length;
  const ssTotal = actual.reduce((acc, val) => acc + Math.pow(val - meanActual, 2), 0);
  const ssResidual = actual.reduce((acc, val, idx) => acc + Math.pow(val - estimated[idx], 2), 0);
  return 1 - (ssResidual / ssTotal);
}

// Dummy function to calculate accuracy (replace with actual calculation)
function calculateAccuracy(actual, predicted) {
  const correct = actual.reduce((acc, val, idx) => acc + (val === predicted[idx] ? 1 : 0), 0);
  return correct / actual.length;
}

// Dummy function to calculate precision (replace with actual calculation)
function calculatePrecision(actual, predicted) {
  // Dummy calculation for binary classification (positive class)
  const truePositives = actual.reduce((acc, val, idx) => acc + (val === 1 && predicted[idx] === 1 ? 1 : 0), 0);
  const falsePositives = actual.reduce((acc, val, idx) => acc + (val === 0 && predicted[idx] === 1 ? 1 : 0), 0);
  return truePositives / (truePositives + falsePositives);
}

// Dummy function to calculate recall (replace with actual calculation)
function calculateRecall(actual, predicted) {
  // Dummy calculation for binary classification (positive class)
  const truePositives = actual.reduce((acc, val, idx) => acc + (val === 1 && predicted[idx] === 1 ? 1 : 0), 0);
  const falseNegatives = actual.reduce((acc, val, idx) => acc + (val === 1 && predicted[idx] === 0 ? 1 : 0), 0);
  return truePositives / (truePositives + falseNegatives);
}

// Dummy function to calculate F1 Score (replace with actual calculation)
function calculateF1Score(actual, predicted) {
  const precision = calculatePrecision(actual, predicted);
  const recall = calculateRecall(actual, predicted);
  return 2 * (precision * recall) / (precision + recall);
}

// Dummy function to calculate confusion matrix (replace with actual calculation)
function calculateConfusionMatrix(actual, predicted) {
  const truePositives = actual.reduce((acc, val, idx) => acc + (val === 1 && predicted[idx] === 1 ? 1 : 0), 0);
  const falsePositives = actual.reduce((acc, val, idx) => acc + (val === 0 && predicted[idx] === 1 ? 1 : 0), 0);
  const trueNegatives = actual.reduce((acc, val, idx) => acc + (val === 0 && predicted[idx] === 0 ? 1 : 0), 0);
  const falseNegatives = actual.reduce((acc, val, idx) => acc + (val === 1 && predicted[idx] === 0 ? 1 : 0), 0);
  return `[[${trueNegatives}, ${falsePositives}], [${falseNegatives}, ${truePositives}]]`;
}

// Dummy function to calculate silhouette score (replace with actual calculation)
function calculateSilhouetteScore(dataPoints, clusterLabels) {
  // Dummy calculation for silhouette score
  return 0.75; // Placeholder value
}

// Call calculateMetrics when the page loads or at an appropriate time
calculateMetrics();

