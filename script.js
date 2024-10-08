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
let sessionTotal = 0;
let notInvestCount = 0;
let lastNotInvestTime = 0;
let spendMoneyTimeout;
let marketCrashTimeout;
let paycheckTimeout;

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

    sessionTotal += parseFloat(priceDifference);

    document.getElementById('result').textContent = result;
    updateSessionTotal();
    currentPrice = newPrice;
    document.getElementById('currentPrice').textContent = `Current Price: $${currentPrice}`;

    notInvestCount = 0;
    clearTimeout(spendMoneyTimeout);
    document.getElementById('spendMoney').textContent = '';

    if (Math.random() < 0.1) { // 10% chance of market crash
        marketCrash();
    }
}

function notInvest() {
    const currentTime = new Date().getTime();

    if (currentTime - lastNotInvestTime <= 30000) {
        notInvestCount++;

        if (notInvestCount >= 10) {
            document.getElementById('spendMoney').textContent = 'SPEND MONEY';
            clearTimeout(spendMoneyTimeout);
            spendMoneyTimeout = setTimeout(() => {
                document.getElementById('spendMoney').textContent = '';
            }, 3000);
        }
    } else {
        notInvestCount = 1;
    }

    lastNotInvestTime = currentTime;
    updateDisplay();
}

function marketCrash() {
    const crashAmount = Math.floor(Math.random() * (300 - 150 + 1)) + 150;
    sessionTotal -= crashAmount;

    const marketCrashElement = document.getElementById('marketCrash');
    marketCrashElement.style.display = 'block';

    clearTimeout(marketCrashTimeout);
    marketCrashTimeout = setTimeout(() => {
        marketCrashElement.style.display = 'none';
    }, 6000);

    updateSessionTotal();
    document.getElementById('result').textContent = `Market crashed! You lost $${crashAmount}!`;
}

function updateSessionTotal() {
    document.getElementById('sessionTotal').textContent = `Session Total: $${sessionTotal.toFixed(2)}`;
}

function paycheck() {
    sessionTotal += 250;
    updateSessionTotal();
    document.getElementById('result').textContent = 'You received your paycheck of $250!';
    document.getElementById('paycheckBtn').disabled = true;
    startPaycheckTimer();
}

function startPaycheckTimer() {
    let timeLeft = 90; // 1.5 minutes in seconds
    const paycheckTimer = document.getElementById('paycheckTimer');
    const paycheckBtn = document.getElementById('paycheckBtn');

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        paycheckTimer.textContent = `Next paycheck in: ${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft === 0) {
            paycheckBtn.disabled = false;
            paycheckTimer.textContent = 'Paycheck ready!';
            clearInterval(paycheckInterval);
        } else {
            timeLeft--;
        }
    }

    updateTimer();
    const paycheckInterval = setInterval(updateTimer, 1000);
}

document.getElementById('investBtn').addEventListener('click', invest);
document.getElementById('notInvestBtn').addEventListener('click', notInvest);
document.getElementById('paycheckBtn').addEventListener('click', paycheck);

updateDisplay();
startPaycheckTimer();