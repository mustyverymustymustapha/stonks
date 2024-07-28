const stockNames = [
  "Catto INC.",
  "Doggo Ltd.",
  "Meme Stonks Co.",
  "Rocket To The Moon Enterprises",
  "Diamond Hands Holdings"
];

let chart;
let currentPrice;

function generateStockName() {
  return stockNames[Math.floor(Math.random() * stockNames.length)];
}

function generateStockData() {
  const data = [];
  for (let i = 0; i < 10; i++) {
      data.push(Math.random() * 100 + 50);
  }
  currentPrice = data[data.length - 1].toFixed(2);
  return data;
}

function createChart(data) {
  const ctx = document.getElementById('stockChart').getContext('2d');

  if (chart) {
      chart.destroy();
  }

  chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: Array.from({length: 10}, (_, i) => i + 1),
