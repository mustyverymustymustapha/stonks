const stockNames = [
    "Catto INC.",
    "Doggo Ltd.",
    "Meme Stonks Co.",
    "Rocket To The Moon Enterprises",
    "Diamond Hands Holdings",
    "Stonks Only Go Up Corp.",
    "Doge's Delights",
    "To The Moon Missions",
    "YOLO Investments",
    "Life Insecurities",
    "Ape Strong Together Ltd.",
    "Cool Guys Are Us",
    "Smooth Brain Solutions",
    "Lambo Dreams Inc.",
    "Meme Magic Ventures",
    "Stonkonomy Experts",
    "Cool Vibes Co.",
    "Gains Group",
    "Rocketship Rentals",
    "Paper Mache Anonymous",
    "Stocks Go Brrr LLC",
    "Banana Republic Trading",
    "Crayon Munchers Investments",
    "Stonk Market Manipulators",
    "Candle Extinguishers",
    "Green Carrot Manufacturers",
    "Fighters United",
    "Short Specialists",
    "Tender Chicken Treasures",
    "Funny Meme Enterprises",
    "Stonk Only Diet Corp.",
    "No Profit INC.",
    "Bear Trap Setters",
    "Slow Marathoners",
    "Uh Oh Association",
    "Bitcoin Addicts",
    "Frenzy Funds",
    "Cat Wave Surfers",
    "FOMO Fuel Industries",
    "Confirmation Bias Builders",
    "Stonk Astrology Experts",
    "Sussy Strength Securities",
    "Teddy Bear Printing Press",
    "Stonks Always Win Co.",
    "Diamond Paws Pet Supplies",
    "Bag Holder's Paradise",
    "Stonk Market Psychics"
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