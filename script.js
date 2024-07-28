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
            datasets: [{
                label: 'Stock Price',
                data: data,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

function updateDisplay() {
    const stockName = generateStockName();
    const stockData = generateStockData();

    document.getElementById('stockName').textContent = stockName;
    document.getElementById('currentPrice').textContent = `Current Price: $${currentPrice}`;
    createChart(stockData);

    document.getElementById('result').textContent = '';
}

function invest() {
    const newPrice = (Math.random() * 100 + 50).toFixed(2);
    const priceDifference = (newPrice - currentPrice).toFixed(2);
    const result = priceDifference >= 0 ? 
        `You gained $${priceDifference}!` : 
        `You lost $${Math.abs(priceDifference)}!`;

    document.getElementById('result').textContent = result;
    currentPrice = newPrice;
    document.getElementById('currentPrice').textContent = `Current Price: $${currentPrice}`;
}

document.getElementById('investBtn').addEventListener('click', invest);
document.getElementById('notInvestBtn').addEventListener('click', updateDisplay);

updateDisplay();