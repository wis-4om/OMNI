let exchangeRates = {};

async function fetchExchangeRates() {
    const apiKey = '371ac124ea560822375ac679'; 
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`; 

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === 'success') {
            exchangeRates = data.conversion_rates;
            console.log('Exchange Rates Updated:', exchangeRates);
        } else {
            alert('Error fetching exchange rates');
        }
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        alert('Unable to fetch exchange rates,turn on your data please');
    }
}

fetchExchangeRates();
setInterval(fetchExchangeRates, 60 * 60 * 1000); 

let currentInput = "";

function appendToCalc(value) {
    currentInput += value;
    document.getElementById('calcDisplay').value = currentInput;
}

function clearCalc() {
    currentInput = "";
    document.getElementById('calcDisplay').value = "";
}

function calculate() {
    try {
        currentInput = eval(currentInput).toString();
        document.getElementById('calcDisplay').value = currentInput;
    } catch (error) {
        document.getElementById('calcDisplay').value = "Error";
        currentInput = "";
    }
}

function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (isNaN(amount) || amount <= 0) {
        document.getElementById('convertedAmount').innerText = "Please enter a valid amount.";
        return;
    }

    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        document.getElementById('convertedAmount').innerText = "Invalid Currency Selected";
        return;
    }

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];

    const convertedAmount = ((amount / fromRate) * toRate).toFixed(2);
    document.getElementById('convertedAmount').innerText = `Converted Amount: ${convertedAmount} ${toCurrency}`;
}

const unitConversionRates = {
    meters: {
        kilometers: 0.001,
        miles: 0.000621371,
        inches: 39.3701
    },
    kilometers: {
        meters: 1000,
        miles: 0.621371,
        inches: 39370.1
    },
    miles: {
        meters: 1609.34,
        kilometers: 1.60934,
        inches: 63360
    },
    inches: {
        meters: 0.0254,
        kilometers: 0.0000254,
        miles: 0.0000157828
    }
};

function convertUnit() {
    const amount = parseFloat(document.getElementById('unitAmount').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    if (isNaN(amount) || amount <= 0) {
        document.getElementById('convertedUnitAmount').innerText = "Please enter a valid amount.";
        return;
    }

    if (!unitConversionRates[fromUnit] || !unitConversionRates[toUnit]) {
        document.getElementById('convertedUnitAmount').innerText = "Invalid unit selected.";
        return;
    }

    const conversionRate = unitConversionRates[fromUnit][toUnit];
    const convertedAmount = (amount * conversionRate).toFixed(2);
    document.getElementById('convertedUnitAmount').innerText = `Converted Amount: ${convertedAmount} ${toUnit}`;
}

function calculateLoan() {
    const principal = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const time = parseFloat(document.getElementById('loanTime').value);

    if (isNaN(principal) || isNaN(interestRate) || isNaN(time) || principal <= 0 || interestRate <= 0 || time <= 0) {
        document.getElementById('loanResult').innerText = "Please enter valid values.";
        return;
    }

    const totalAmount = (principal * (1 + interestRate * time)).toFixed(2);
    document.getElementById('loanResult').innerText = `Total Amount: ${totalAmount}`;
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

const taxBrackets = {
    us: [
        { limit: 50000, rate: 0.05 },
        { limit: 100000, rate: 0.10 },
        { limit: 200000, rate: 0.15 },
        { limit: Infinity, rate: 0.20 }
    ],
    uk: [
        { limit: 50000, rate: 0.20 },
        { limit: 150000, rate: 0.40 },
        { limit: Infinity, rate: 0.45 }
    ],
    canada: [
        { limit: 49000, rate: 0.15 },
        { limit: 98000, rate: 0.205 },
        { limit: 150000, rate: 0.26 },
        { limit: Infinity, rate: 0.29 }
    ],
    nigeria: [
        { limit: 300000, rate: 0.07 },
        { limit: 600000, rate: 0.11 },
        { limit: 1100000, rate: 0.15 },
        { limit: Infinity, rate: 0.24 }
    ],
    australia: [
        { limit: 18200, rate: 0 },
        { limit: 45000, rate: 0.19 },
        { limit: 120000, rate: 0.325 },
        { limit: 180000, rate: 0.37 },
        { limit: Infinity, rate: 0.45 }
    ],
    germany: [
        { limit: 9744, rate: 0 },
        { limit: 57918, rate: 0.14 },
        { limit: 274612, rate: 0.42 },
        { limit: Infinity, rate: 0.45 }
    ],
    india: [
        { limit: 250000, rate: 0 },
        { limit: 500000, rate: 0.05 },
        { limit: 1000000, rate: 0.20 },
        { limit: Infinity, rate: 0.30 }
    ],
    france: [
        { limit: 10777, rate: 0 },
        { limit: 27478, rate: 0.11 },
        { limit: 78570, rate: 0.30 },
        { limit: 168994, rate: 0.41 },
        { limit: Infinity, rate: 0.45 }
    ],
    mexico: [
        { limit: 6942, rate: 0.0192 },
        { limit: 58922, rate: 0.064 },
        { limit: 103550, rate: 0.1088 },
        { limit: 120000, rate: 0.16 },
        { limit: Infinity, rate: 0.30 }
    ],
    south_africa: [
        { limit: 226000, rate: 0.18 },
        { limit: 353100, rate: 0.26 },
        { limit: 488700, rate: 0.31 },
        { limit: 641400, rate: 0.36 },
        { limit: Infinity, rate: 0.39 }
    ]
};

function estimateTax() {
    const salary = parseFloat(document.getElementById('salary').value);
    const country = document.getElementById('country').value;

    if (isNaN(salary) || salary <= 0) {
        document.getElementById('taxResult').innerText = "Please enter a valid salary.";
        return;
    }

    const brackets = taxBrackets[country];
    
    let taxAmount = 0;
    let remainingIncome = salary;
    
    for (let i = 0; i < brackets.length; i++) {
        const { limit, rate } = brackets[i];
        if (remainingIncome > limit) {
            taxAmount += limit * rate;
            remainingIncome -= limit;
        } else {
            taxAmount += remainingIncome * rate;
            break;
        }
    }

    document.getElementById('taxResult').innerText = `Estimated Tax: $${taxAmount.toFixed(2)}`;
}
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

window.onclick = function(event) {
    if (event.target.classList.contains("modal")) {
        event.target.style.display = "none";
    }
}
